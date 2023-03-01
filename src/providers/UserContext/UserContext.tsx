import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IUser,
  IRegisterFormValues,
  ILoginFormValues,
  IDefaultProviderProps,
} from './@types';
import { api } from '../../services/api';

interface IUserContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  userRegister: (formData: IRegisterFormValues) => Promise<void>;
  userLogin: (formData: ILoginFormValues) => Promise<void>;
  userLogOut: () => void;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    const id = localStorage.getItem('@USERID');
    if (token) {
      const userAutoLogin = async () => {
        try {
          const response = await api.get(`/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          navigate('/shop');
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      userAutoLogin();
    }
  }, []);

  const userRegister = async (formData: IRegisterFormValues) => {
    try {
      setLoading(true);
      const response = await api.post('/users', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.acessToken);
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (formData: ILoginFormValues) => {
    try {
      setLoading(true);
      const response = await api.post('/login', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.acessToken);
      localStorage.setItem('@USERID', response.data.user.id);
      navigate('/shop');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogOut = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        user,
        userRegister,
        userLogin,
        userLogOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
