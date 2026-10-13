import { useContext } from 'react';
import { MdClose } from 'react-icons/md';
import CartProductList from './CartProductList';
import { StyledCartModalBox } from './style';
import { StyledParagraph, StyledTitle } from '../../styles/typography';
import { CartContext } from '../../providers/CartContext/CartContext';
import { useLanguage } from '../../i18n';

const CartModal = () => {
  const { setCartModal, productCart } = useContext(CartContext);
  const { t } = useLanguage();

  const closeModal = () => {
    setCartModal(false);
  };

  return (
    <StyledCartModalBox>
      <dialog>
        <header>
          <StyledTitle tag='h2' $fontSize='three'>
            {t('Carrinho de compras')}
          </StyledTitle>
          <button
            type='button'
            aria-label={t('Fechar')}
            onClick={() => closeModal()}
          >
            <MdClose size={21} />
          </button>
        </header>
        <div className='cartBox'>
          {productCart.length > 0 ? (
            <CartProductList />
          ) : (
            <div className='emptyBox'>
              <StyledTitle tag='h3' $fontSize='three' textAlign='center'>
                {t('Sua sacola está vazia')}
              </StyledTitle>
              <StyledParagraph textAlign='center'>
                {t('Adicione itens')}
              </StyledParagraph>
            </div>
          )}
        </div>
      </dialog>
    </StyledCartModalBox>
  );
};

export default CartModal;
