import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext/CartContext';

const ProductList = () => {
  const { products, searchTerm } = useContext(CartContext);
  const filteredProducts = products.filter((product) =>
    product.name.toLocaleLowerCase('pt-BR').includes(searchTerm.toLocaleLowerCase('pt-BR'))
  );

  return (
    <StyledProductList>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
