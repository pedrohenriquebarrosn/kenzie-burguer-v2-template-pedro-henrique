import { MdAdd, MdRemove, MdDelete } from 'react-icons/md';
import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { IProductCart } from '../../../../providers/CartContext/@types';
import { CartContext } from '../../../../providers/CartContext/CartContext';
import { getProductPhoto } from '../../../../providers/CartContext/productPhotos';
import { useLanguage } from '../../../../i18n';

const money = (value: number, lang: string) => value.toLocaleString(lang === 'en' ? 'en-US' : 'pt-BR', { style: 'currency', currency: 'BRL' });

const CartProductCard = ({ name, img, id, category, price, quantity }: IProductCart) => {
  const { changeProductQuantity, removeProductFromCart } = useContext(CartContext);
  const { t, lang } = useLanguage();

  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img
          src={getProductPhoto(id, img)}
          alt={t(name)}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = img;
          }}
        />
      </div>
      <div className='contentBox'>
        <div className='productInfo'>
          <StyledTitle tag='h3' $fontSize='three'>{t(name)}</StyledTitle>
          <p className='unitPrice'>{money(Number(price),lang)}{t(' / unidade')}</p>
          <div className='quantityControls' aria-label={`${t('Quantidade de ')}${t(name)}`}>
            <button type='button' aria-label={`${t('Diminuir quantidade de ')}${t(name)}`}
              onClick={() => changeProductQuantity(id, -1)}>
              <MdRemove size={18} />
            </button>
            <output aria-live='polite' aria-label={`${t('Quantidade atual: ')}${quantity}`}>{quantity}</output>
            <button type='button' aria-label={`${t('Aumentar quantidade de ')}${t(name)}`}
              onClick={() => changeProductQuantity(id, 1)}>
              <MdAdd size={18} />
            </button>
          </div>
        </div>
        <div className='itemActions'>
          <button type='button' className='removeItem' aria-label={`${t('Remover ')}${t(name)}`}
            onClick={() => removeProductFromCart(id)}>
            <MdDelete size={20} />
          </button>
          <span className='lineSubtotal'>{money(Number(price) * quantity,lang)}</span>
        </div>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
