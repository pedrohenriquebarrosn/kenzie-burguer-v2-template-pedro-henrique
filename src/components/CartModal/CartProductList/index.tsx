import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext/CartContext';

const CartProductList = () => {
  const { productCart, removeAllProducts, totalValue } =
    useContext(CartContext);

  return (
    <StyledCartProductList>
      <ul>
        {productCart.map((cartProduct) => (
          <CartProductCard
            key={cartProduct.id}
            name={cartProduct.name}
            id={cartProduct.id}
            img={cartProduct.img}
            category={cartProduct.category}
            price={cartProduct.price}
          />
        ))}
      </ul>
      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total </strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          {totalValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => removeAllProducts(0)}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
