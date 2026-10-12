import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ICartContext, IDefaultProviderProps, IProduct, IProductCart } from './@types';
import { UserContext } from '../UserContext/UserContext';
import { demoProducts } from './demoProducts';
import { db } from '../../services/supabase';

export const CartContext = createContext({} as ICartContext);
export const CartProvider = ({ children }: IDefaultProviderProps) => {
  const [cartModal, setCartModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isDemo, user } = useContext(UserContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productCart, setProductCart] = useState<IProductCart[]>([]);

  useEffect(() => {
    let active = true;
    setProductCart([]);
    if (isDemo) { setProducts(demoProducts); return; }
    if (!user?.id) { setProducts([]); return; }
    (async () => {
      try {
        const rows = await db<IProduct[]>('kenzieburguer_products?select=id,name,category,price,img&active=eq.true&order=id.asc');
        const selected = await db<{product_id:number}[]>('kenzieburguer_cart_items?select=product_id');
        if (!active) return;
        setProducts(rows);
        setProductCart(rows.filter(p => selected.some(s => s.product_id === p.id)));
      } catch(error: any) {
        if (active) toast.error(error?.message || 'Erro ao carregar os produtos.');
      }
    })();
    return () => { active = false; };
  }, [isDemo, user?.id]);

  const addProductToCart = async (product: IProductCart) => {
    if (productCart.some(p => p.id === product.id)) {
      toast.error('O item já está no carrinho!');
      return;
    }
    try {
      if (!isDemo) {
        if (!user?.id) throw new Error('Faça login novamente.');
        await db('kenzieburguer_cart_items', 'POST', [{user_id:user.id,product_id:product.id}]);
      }
      setProductCart(current => current.some(p => p.id === product.id) ? current : [...current,product]);
      toast.success('Produto adicionado!');
    } catch(error: any) { toast.error(error?.message || 'Não foi possível adicionar ao carrinho.'); }
  };
  const removeProductFromCart = async (id: number) => {
    try {
      if (!isDemo) await db(`kenzieburguer_cart_items?product_id=eq.${id}`, 'DELETE');
      setProductCart(current => current.filter(p => p.id !== id));
      toast.success('Produto removido!');
    } catch(error: any) { toast.error(error?.message || 'Não foi possível remover o produto.'); }
  };
  const removeAllProducts = async () => {
    try {
      if (!isDemo) {
        if (!user?.id) throw new Error('Faça login novamente.');
        await db(`kenzieburguer_cart_items?user_id=eq.${encodeURIComponent(user.id)}`, 'DELETE');
      }
      setProductCart([]);
    } catch(error: any) { toast.error(error?.message || 'Não foi possível limpar o carrinho.'); }
  };
  const totalValue = productCart.reduce((total,item) => total + Number(item.price), 0);
  return (
    <CartContext.Provider value={{
      cartModal, setCartModal, searchTerm, setSearchTerm,
      addProductToCart, removeProductFromCart, removeAllProducts,
      products, productCart, totalValue,
    }}>{children}</CartContext.Provider>
  );
};
