import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { IProduct } from '../../../providers/CartContext/@types';
import { CartContext } from '../../../providers/CartContext/CartContext';
import { getProductPhoto } from '../../../providers/CartContext/productPhotos';

interface IProductCard {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCard) => {
  const { addProductToCart } = useContext(CartContext);
  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img
          src={getProductPhoto(product.id, product.img)}
          alt={product.name}
          loading='lazy'
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = product.img;
          }}
        />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <StyledParagraph className='category'>
          {product.category}
        </StyledParagraph>
        <StyledParagraph className='price'>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</StyledParagraph>
        <StyledButton
          $buttonSize='medium'
          $buttonStyle='green'
          onClick={() => addProductToCart(product)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
