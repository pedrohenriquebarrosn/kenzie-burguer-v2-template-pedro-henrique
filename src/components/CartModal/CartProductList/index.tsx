import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext/CartContext';
import { useLanguage } from '../../../i18n';

const CartProductList = () => {
  const { productCart, removeAllProducts, totalItems, totalValue } =
    useContext(CartContext);
  const { t, lang } = useLanguage();

  return (
    <StyledCartProductList>
      <ul>
        {productCart.map((cartProduct) => (
          <CartProductCard key={cartProduct.id} {...cartProduct} />
        ))}
      </ul>
      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total ({totalItems} {totalItems === 1 ? 'item' : t('itens')})</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          {totalValue.toLocaleString(lang === 'en' ? 'en-US' : 'pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
      </div>
      <StyledButton type='button'
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => removeAllProducts()}
      >
        {t('Remover todos')}
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
