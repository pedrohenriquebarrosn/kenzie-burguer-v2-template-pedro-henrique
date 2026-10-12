import { useContext } from 'react';
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';

import { StyledContainer } from '../../styles/grid';
import { CartContext } from '../../providers/CartContext/CartContext';
import { UserContext } from '../../providers/UserContext/UserContext';

const ShopPage = () => {
  const { cartModal } = useContext(CartContext);
  const { isDemo } = useContext(UserContext);

  return (
    <StyledShopPage>
      {cartModal && <CartModal />}
      <Header />
      <p role='status' style={{ padding: '12px', textAlign: 'center', background: '#fff3d3', color: '#212529' }}>
        {isDemo
          ? 'Loja demonstrativa: produtos e preços fictícios. Não há pedidos, pagamentos ou contas reais.'
          : 'Projeto educacional: catálogo e preços ilustrativos. Carrinho salvo na conta; pedidos e pagamentos não estão disponíveis.'}
      </p>
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
