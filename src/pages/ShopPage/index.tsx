import { useContext } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';

import { StyledContainer } from '../../styles/grid';
import { CartContext } from '../../providers/CartContext/CartContext';
import { UserContext } from '../../providers/UserContext/UserContext';
import { useLanguage } from '../../i18n';

const ShopPage = () => {
  const { cartModal, products } = useContext(CartContext);
  const { isDemo } = useContext(UserContext);
  const { t } = useLanguage();

  return (
    <StyledShopPage>
      {cartModal && <CartModal />}
      <Header />
      <main>
        <StyledContainer containerWidth={1200}>
          <p role='status' className='demoNotice'>
            <MdInfoOutline aria-hidden='true' size={20} />
            <span>
              {isDemo
                ? t('Loja demonstrativa: produtos e preços fictícios. Não há pedidos, pagamentos ou contas reais.')
                : t('Projeto educacional: catálogo e preços ilustrativos. Carrinho salvo na conta; pedidos e pagamentos não estão disponíveis.')}
            </span>
          </p>
          <section className='catalogIntro' aria-label={t('Introdução ao catálogo')}>
            <div>
              <span className='eyebrow'>KENZIE BURGUER 2.0</span>
              <h1>{t('Escolha seus favoritos')}</h1>
              <p>{t('Explore o cardápio ilustrativo e monte seu carrinho.')}</p>
            </div>
            <span className='productCount'>{products.length}{t(' produtos no catálogo')}</span>
          </section>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
