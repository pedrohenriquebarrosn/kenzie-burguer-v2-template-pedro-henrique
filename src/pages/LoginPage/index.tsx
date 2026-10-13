import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserContext/UserContext';
import { StyledLoginPage } from './style';
import LoginForm from '../../components/Form/LoginForm';
import IllustrationBox from '../../components/IllustrationBox';
import { useLanguage } from '../../i18n';

import { StyledButton, StyledButtonLink } from '../../styles/button';
import { StyledContainer, StyledGridBox } from '../../styles/grid';
import { StyledParagraph, StyledTitle } from '../../styles/typography';

const LoginPage = () => {
  const { startDemo, user, loading } = useContext(UserContext);
  const { t } = useLanguage();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user) navigate('/shop', { replace: true });
  }, [loading, user, navigate]);
  return (
  <StyledLoginPage>
    <StyledContainer>
      <div className='flexGrid'>
        <div className='left'>
          <StyledGridBox className='formBox'>
            <StyledTitle tag='h2' $fontSize='three'>
              {t('Login')}
            </StyledTitle>
            <LoginForm />
            <StyledParagraph textAlign='center' fontColor='gray'>
              {t('Crie sua conta para saborear muitas delícias e matar sua fome!')}
            </StyledParagraph>
            <StyledButtonLink
              to='/register'
              $buttonSize='default'
              $buttonStyle='gray'
            >
              {t('Cadastrar')}
            </StyledButtonLink>
            <StyledParagraph textAlign='center' fontColor='gray'>
              {t('Ou explore o catálogo e o carrinho, sem usar uma conta real:')}
            </StyledParagraph>
            <StyledButton type='button' onClick={startDemo}
              $buttonSize='default' $buttonStyle='green'>
              {t('Acessar demonstração')}
            </StyledButton>
          </StyledGridBox>
        </div>
        <div className='right'>
          <IllustrationBox />
        </div>
      </div>
    </StyledContainer>
  </StyledLoginPage>
  );
};

export default LoginPage;
