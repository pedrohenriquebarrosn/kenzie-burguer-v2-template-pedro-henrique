import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ICartContext, IDefaultProviderProps, IProduct, IProductCart } from './@types';
import { UserContext } from '../UserContext/UserContext';
import { demoProducts } from './demoProducts';
import { db } from '../../services/supabase';

export const CartContext = createContext({} as ICartContext);

type StoredCartRow = { product_id: number; quantity?: number };
const MAX_QUANTITY = 99;

export const CartProvider = ({ children }: IDefaultProviderProps) => {
  const [cartModal, setCartModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isDemo, user } = useContext(UserContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productCart, setProductCart] = useState<IProductCart[]>([]);
  const cartRef = useRef<IProductCart[]>([]);
  // Serialize authenticated writes to preserve rapid +/- clicks in the correct order.
  const writeQueue = useRef<Promise<void>>(Promise.resolve());
  const scopeRef = useRef('');
  const syncFailedRef = useRef(false);

  const replaceCart = (next: IProductCart[]) => {
    cartRef.current = next;
    setProductCart(next);
  };

  const hydratedCart = (catalog: IProduct[], selected: StoredCartRow[]): IProductCart[] =>
    catalog.flatMap((product) => {
      const row = selected.find((item) => item.product_id === product.id);
      if (!row) return [];
      const quantity = Number(row.quantity ?? 1);
      return Number.isInteger(quantity) && quantity > 0
        ? [{ ...product, quantity: Math.min(MAX_QUANTITY, quantity) }]
        : [];
    });

  useEffect(() => {
    let active = true;
    const scope = isDemo ? 'demo' : (user?.id || 'signed-out');
    scopeRef.current = scope;
    writeQueue.current = Promise.resolve();
    syncFailedRef.current = false;
    replaceCart([]);

    if (isDemo) {
      setProducts(demoProducts);
      return () => { active = false; };
    }
    if (!user?.id) {
      setProducts([]);
      return () => { active = false; };
    }

    (async () => {
      try {
        const catalog = await db<IProduct[]>('kenzieburguer_products?select=id,name,category,price,img&active=eq.true&order=id.asc');
        const selected = await db<StoredCartRow[]>('kenzieburguer_cart_items?select=product_id,quantity');
        if (!active || scopeRef.current !== scope) return;
        setProducts(catalog);
        replaceCart(hydratedCart(catalog, selected));
      } catch (error: any) {
        if (active && scopeRef.current === scope) {
          toast.error(error?.message || 'Erro ao carregar os produtos.', { toastId: 'burger-load-error' });
        }
      }
    })();

    return () => { active = false; };
  }, [isDemo, user?.id]);

  const persistChange = (productId: number, previous: number, next: number, scope: string) => {
    if (isDemo) return;

    writeQueue.current = writeQueue.current.then(async () => {
      if (scopeRef.current !== scope || syncFailedRef.current) return;
      if (!user?.id) throw new Error('Faça login novamente.');

      if (previous === 0 && next > 0) {
        await db('kenzieburguer_cart_items', 'POST', [{
          user_id: user.id, product_id: productId, quantity: next,
        }]);
      } else if (next === 0) {
        await db(`kenzieburguer_cart_items?product_id=eq.${productId}&user_id=eq.${encodeURIComponent(user.id)}`, 'DELETE');
      } else {
        await db(`kenzieburguer_cart_items?product_id=eq.${productId}&user_id=eq.${encodeURIComponent(user.id)}`, 'PATCH', {
          quantity: next,
        });
      }
    }).catch(async () => {
      if (scopeRef.current !== scope) return;
      syncFailedRef.current = true;
      toast.error('Não foi possível salvar o carrinho. Atualize a página e tente novamente.', { toastId: 'burger-cart-save-error' });
      // Read back authoritative data; do not pretend that optimistic changes persisted.
      try {
        const selected = await db<StoredCartRow[]>('kenzieburguer_cart_items?select=product_id,quantity');
        if (scopeRef.current === scope) replaceCart(hydratedCart(products, selected));
      } catch { /* Already reported; a reload will retry the fetch. */ }
    });
  };

  const setQuantity = (product: IProduct, quantity: number) => {
    const existing = cartRef.current.find((row) => row.id === product.id);
    const previous = existing?.quantity || 0;
    if (quantity === previous) return;
    if (quantity > MAX_QUANTITY) {
      toast.info('Limite de 99 unidades por produto.', { toastId: 'burger-cart-quantity-max' });
      return;
    }
    if (syncFailedRef.current) {
      toast.error('Atualize a página para sincronizar o carrinho.', { toastId: 'burger-cart-save-error' });
      return;
    }
    const next = Math.max(0, quantity);
    const updated = next === 0
      ? cartRef.current.filter((row) => row.id !== product.id)
      : existing
        ? cartRef.current.map((row) => row.id === product.id ? { ...row, quantity: next } : row)
        : [...cartRef.current, { ...product, quantity: next }];
    replaceCart(updated);
    persistChange(product.id, previous, next, scopeRef.current);
  };

  const addProductToCart = (product: IProduct) => {
    const current = cartRef.current.find((row) => row.id === product.id);
    setQuantity(product, (current?.quantity || 0) + 1);
  };

  const changeProductQuantity = (productId: number, delta: number) => {
    const product = cartRef.current.find((row) => row.id === productId);
    if (product) setQuantity(product, product.quantity + delta);
  };

  const removeProductFromCart = (id: number) => {
    const product = cartRef.current.find((row) => row.id === id);
    if (product) setQuantity(product, 0);
  };

  const removeAllProducts = () => {
    if (cartRef.current.length === 0 || syncFailedRef.current) return;
    replaceCart([]);
    if (isDemo) return;
    const scope = scopeRef.current;
    writeQueue.current = writeQueue.current.then(async () => {
      if (scopeRef.current !== scope || syncFailedRef.current) return;
      if (!user?.id) throw new Error('Faça login novamente.');
      await db(`kenzieburguer_cart_items?user_id=eq.${encodeURIComponent(user.id)}`, 'DELETE');
    }).catch(async () => {
      if (scopeRef.current !== scope) return;
      syncFailedRef.current = true;
      toast.error('Não foi possível esvaziar o carrinho. Atualize a página.', { toastId: 'burger-cart-save-error' });
    });
  };

  const totalItems = productCart.reduce((total, item) => total + item.quantity, 0);
  const totalValue = productCart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartModal, setCartModal, searchTerm, setSearchTerm,
      addProductToCart, changeProductQuantity, removeProductFromCart, removeAllProducts,
      products, productCart, totalItems, totalValue,
    }}>{children}</CartContext.Provider>
  );
};
