import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { StyledMainLoad } from './style';
import { UserContext } from '../../providers/UserContext/UserContext';

export const ProtectedRoutes = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <StyledMainLoad>
        <h1>Carregando</h1>
      </StyledMainLoad>
    );
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{user ? <Outlet /> : <Navigate to='/shop' />}</>;
};
