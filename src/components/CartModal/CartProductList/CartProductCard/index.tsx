import { MdAdd, MdRemove, MdDelete } from 'react-icons/md';
import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { IProductCart } from '../../../../providers/CartContext/@types';
import { CartContext } from '../../../../providers/CartContext/CartContext';

const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const CartProductCard = ({ name, img, id, category, price, quantity }: IProductCart) => {
  const { changeProductQuantity, removeProductFromCart } = useContext(CartContext);

  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='contentBox'>
        <div className='productInfo'>
          <StyledTitle tag='h3' $fontSize='three'>{name}</StyledTitle>
          <p className='unitPrice'>{money(Number(price))} / unidade</p>
          <div className='quantityControls' aria-label={`Quantidade de ${name}`}>
            <button type='button' aria-label={`Diminuir quantidade de ${name}`}
              onClick={() => changeProductQuantity(id, -1)}>
              <MdRemove size={18} />
            </button>
            <output aria-live='polite' aria-label={`Quantidade atual: ${quantity}`}>{quantity}</output>
            <button type='button' aria-label={`Aumentar quantidade de ${name}`}
              onClick={() => changeProductQuantity(id, 1)}>
              <MdAdd size={18} />
            </button>
          </div>
        </div>
        <div className='itemActions'>
          <button type='button' className='removeItem' aria-label={`Remover ${name}`}
            onClick={() => removeProductFromCart(id)}>
            <MdDelete size={20} />
          </button>
          <span className='lineSubtotal'>{money(Number(price) * quantity)}</span>
        </div>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
