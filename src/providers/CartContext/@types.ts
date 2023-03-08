export interface IDefaultProviderProps {
  children: React.ReactNode;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface IProductCart {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface ICartContext {
  cartModal: boolean;
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  addProductToCart: (currentProduct: IProductCart) => void;
  removeProductFromCart: (currentId: number) => void;
  removeAllProducts: (id: number) => void;
  products: IProduct[];
  productCart: IProductCart[];
  totalValue: number;
}
