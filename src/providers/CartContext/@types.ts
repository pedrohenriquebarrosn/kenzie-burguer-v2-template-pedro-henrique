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

export interface IProductCart extends IProduct {
  quantity: number;
}

export interface ICartContext {
  cartModal: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  addProductToCart: (product: IProduct) => void;
  changeProductQuantity: (productId: number, delta: number) => void;
  removeProductFromCart: (productId: number) => void;
  removeAllProducts: () => void;
  products: IProduct[];
  productCart: IProductCart[];
  totalItems: number;
  totalValue: number;
}
