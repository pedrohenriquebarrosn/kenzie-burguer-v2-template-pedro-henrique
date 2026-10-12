import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext/CartContext';

const ProductList = () => {
  const { products, searchTerm } = useContext(CartContext);
  // Search by word prefix, not arbitrary substrings. "S" finds Suco,
  // not Nuggets. Full-name prefix ranks before other word-prefix matches.
  const normalize = (value: string) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s*\(demo\)\s*/gi, '')
    .trim()
    .toLocaleLowerCase('pt-BR');
  const query = normalize(searchTerm);
  const filteredProducts = !query ? products : products
    .map((product, index) => {
      const name = normalize(product.name);
      const words = name.split(/\s+/);
      const rank = name.startsWith(query) ? 0 : words.some((word) => word.startsWith(query)) ? 1 : 2;
      return { product, index, rank };
    })
    .filter((match) => match.rank < 2)
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map((match) => match.product);

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
