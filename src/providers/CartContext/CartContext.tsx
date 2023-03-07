import { createContext, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';
import {
  ICartContext,
  IDefaultProviderProps,
  IProduct,
  IProductCart,
} from './@types';
import { api } from '../../services/api';

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: IDefaultProviderProps) => {
  const [cartModal, setCartModal] = useState(false);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [productCart, setProductCart] = useState<IProductCart[]>([]);
  const [search, setSearch] = useState('');

  const searchProducts = products.filter((product) =>
    search === ''
      ? true
      : product.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        product.category.toLowerCase().includes(search.toLocaleLowerCase())
  );

  useEffect(() => {
    async function loadProductsData() {
      try {
        const token = localStorage.getItem('@TOKEN');
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (erro) {
        // eslint-disable-next-line no-console
        console.log(erro);
      }
    }
    loadProductsData();
  }, []);

  const addProductToCart = (currentProduct: IProductCart) => {
    if (!productCart.some((product) => product.id === currentProduct.id)) {
      setProductCart([...productCart, currentProduct]);
      toast.success('O item foi adicionado à lista com sucesso!');
    } else {
      toast.error('O item já foi adicionado à lista!');
    }
    console.log(productCart);
  };

  const removeProductFromCart = (currentId: number) => {
    const newProductCart = productCart.filter(
      (product) => product.id !== currentId
    );
    toast.success('O item foi removido da lista com sucesso!');
    setProductCart(newProductCart);
  };

  const removeAllProducts = (id: number) => {
    const newProduct = productCart.filter((product) => product.id === id);
    setProductCart(newProduct);
  };

  const totalValue = productCart.reduce(
    (previusValue, currentValue) => previusValue + currentValue.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartModal,
        setCartModal,
        addProductToCart,
        removeProductFromCart,
        removeAllProducts,
        products,
        productCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
