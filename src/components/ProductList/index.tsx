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
    <StyledProductList aria-label='Produtos do catálogo'>
      {filteredProducts.length > 0
        ? filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : (
          <li className='emptyState'>
            <h2>Nenhum produto encontrado</h2>
            <p>Tente pesquisar por outro nome.</p>
          </li>
        )}
    </StyledProductList>
  );
};

export default ProductList;
