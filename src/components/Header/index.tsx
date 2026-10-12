import { MdShoppingCart, MdLogout } from 'react-icons/md';

import { useContext } from 'react';
import SearchForm from './SearchForm';
import { StyledHeader } from './style';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';

import { StyledContainer } from '../../styles/grid';
import { CartContext } from '../../providers/CartContext/CartContext';
import { UserContext } from '../../providers/UserContext/UserContext';

const Header = () => {
  const { setCartModal, productCart } = useContext(CartContext);
  const { userLogOut } = useContext(UserContext);

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
                aria-label='Abrir carrinho'
                onClick={() => {
                  openModal();
                }}
              >
                <MdShoppingCart size={26} />
                {productCart.length > 0 && <span className='cartCount' aria-hidden='true'>{productCart.length}</span>}
              </button>
              <button type='button' aria-label='Sair' onClick={() => userLogOut()}>
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
