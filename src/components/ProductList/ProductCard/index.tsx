import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { IProduct } from '../../../providers/CartContext/@types';
import { CartContext } from '../../../providers/CartContext/CartContext';
import { getProductPhoto } from '../../../providers/CartContext/productPhotos';
import { useLanguage } from '../../../i18n';

interface IProductCard {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCard) => {
  const { addProductToCart } = useContext(CartContext);
  const { t, lang } = useLanguage();
  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img
          src={getProductPhoto(product.id, product.img)}
          alt={t(product.name)}
          loading='lazy'
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = product.img;
          }}
        />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {t(product.name)}
        </StyledTitle>
        <StyledParagraph className='category'>
          {t(product.category)}
        </StyledParagraph>
        <StyledParagraph className='price'>{product.price.toLocaleString(lang === 'en' ? 'en-US' : 'pt-BR', { style: 'currency', currency: 'BRL' })}</StyledParagraph>
        <StyledButton
          $buttonSize='medium'
          $buttonStyle='green'
          onClick={() => addProductToCart(product)}
        >
          {t('Adicionar')}
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
