import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserContext/UserContext';
import { StyledLoginPage } from './style';
import LoginForm from '../../components/Form/LoginForm';
import IllustrationBox from '../../components/IllustrationBox';

import { StyledButton, StyledButtonLink } from '../../styles/button';
import { StyledContainer, StyledGridBox } from '../../styles/grid';
import { StyledParagraph, StyledTitle } from '../../styles/typography';

const LoginPage = () => {
  const { startDemo, user, loading } = useContext(UserContext);
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
              Login
            </StyledTitle>
            <LoginForm />
            <StyledParagraph textAlign='center' fontColor='gray'>
              Crie sua conta para saborear muitas delícias e matar sua fome!
            </StyledParagraph>
            <StyledButtonLink
              to='/register'
              $buttonSize='default'
              $buttonStyle='gray'
            >
              Cadastrar
            </StyledButtonLink>
            <StyledParagraph textAlign='center' fontColor='gray'>
              Ou explore o catálogo e o carrinho, sem usar uma conta real:
            </StyledParagraph>
            <StyledButton type='button' onClick={startDemo}
              $buttonSize='default' $buttonStyle='green'>
              Acessar demonstração
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
