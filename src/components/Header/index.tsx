import { MdShoppingCart, MdLogout } from 'react-icons/md';

import { useContext } from 'react';
import SearchForm from './SearchForm';
import { StyledHeader } from './style';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';

import { StyledContainer } from '../../styles/grid';
import { CartContext } from '../../providers/CartContext/CartContext';
import { UserContext } from '../../providers/UserContext/UserContext';
import { useLanguage } from '../../i18n';

const Header = () => {
  const { setCartModal, totalItems } = useContext(CartContext);
  const { userLogOut } = useContext(UserContext);
  const { t } = useLanguage();

  const openModal = () => {
    setCartModal(true);
  };

  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className='flexGrid'>
          <img
            src={LogoKenzieBurguer}
            alt='Kenzie Burguer Logo'
            className='logo'
          />
          <nav className='nav' role='navigation'>
            <SearchForm />
            <div className='buttons'>
              <button
                type='button'
                className='cartButton'
                aria-label={t('Abrir carrinho')}
                onClick={() => {
                  openModal();
                }}
              >
                <MdShoppingCart size={26} />
                {totalItems > 0 && <span className='cartCount' aria-hidden='true'>{totalItems}</span>}
              </button>
              <button type='button' aria-label={t('Sair')} onClick={() => userLogOut()}>
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
