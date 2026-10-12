import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  IUser,
  IRegisterFormValues,
  ILoginFormValues,
  IDefaultProviderProps,
  IUserContext,
} from './@types';
import { api } from '../../services/api';

export const UserContext = createContext({} as IUserContext);

const DEMO_SESSION = '@KENZIE_BURGUER_DEMO';
const DEMO_USER: IUser = { id: 'demo', name: 'Visitante', email: 'demo@example.invalid' };


export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    if (localStorage.getItem(DEMO_SESSION) === 'true') {
      setUser(DEMO_USER);
      setIsDemo(true);
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('@TOKEN');
    const id = localStorage.getItem('@USERID');
    if (!token || !id) {
      // Missing or incomplete session should never leave routes loading forever.
      if (token || id) {
        localStorage.removeItem('@TOKEN');
        localStorage.removeItem('@USERID');
      }
      setLoading(false);
      return;
    }

    const userAutoLogin = async () => {
      try {
        const response = await api.get(`/users/${encodeURIComponent(id)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (active) {
          setUser(response.data);
          navigate('/shop');
        }
      } catch (error: any) {
        if (active) {
          if ([401, 403].includes(error?.response?.status)) {
            localStorage.removeItem('@TOKEN');
            localStorage.removeItem('@USERID');
          }
          setUser(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    userAutoLogin();
    return () => { active = false; };
  }, [navigate]);

  const userRegister = async (formData: IRegisterFormValues) => {
    setLoading(true);
    try {
      await api.post('/users', formData);
      // Registration and authentication are separate operations.
      toast.success('Usuário cadastrado com sucesso! Faça login.');
      navigate('/');
    } catch (error: any) {
      toast.error(!error?.response || error.response.status >= 500
        ? 'Serviço de cadastro indisponível.'
        : 'Não foi possível cadastrar o usuário. Confira os dados.');
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (formData: ILoginFormValues) => {
    setLoading(true);
    try {
      const response = await api.post('/login', formData);
      const authenticatedUser = response.data?.user;
      const token = response.data?.accessToken;
      if (!authenticatedUser?.id || !token) {
        throw new Error('Resposta de autenticação incompleta');
      }
      setUser(authenticatedUser);
      localStorage.setItem('@TOKEN', token);
      localStorage.setItem('@USERID', String(authenticatedUser.id));
      toast.success('Login feito com sucesso!');
      navigate('/shop');
    } catch (error: any) {
      toast.error([400, 401, 403].includes(error?.response?.status)
        ? 'Usuário ou senha incorretos'
        : 'Serviço de login indisponível.');
    } finally {
      setLoading(false);
    }
  };

  const startDemo = () => {
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USERID');
    localStorage.setItem(DEMO_SESSION, 'true');
    setIsDemo(true);
    setUser(DEMO_USER);
    setLoading(false);
    navigate('/shop');
  };

  const userLogOut = () => {
    localStorage.removeItem(DEMO_SESSION);
    setIsDemo(false);
    setUser(null);
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USERID');
    navigate('/');
  };

  return (
    <UserContext.Provider value={{
      loading, setLoading, user, userRegister, userLogin, userLogOut, isDemo, startDemo,
    }}>
      {children}
    </UserContext.Provider>
  );
};
