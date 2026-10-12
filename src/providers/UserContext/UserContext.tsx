import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IUser, IRegisterFormValues, ILoginFormValues, IDefaultProviderProps, IUserContext } from './@types';
import { getSessionUser, signUp, signIn, signOut, SupabaseUser } from '../../services/supabase';

export const UserContext = createContext({} as IUserContext);
const DEMO_SESSION = '@KENZIE_BURGUER_DEMO';
const DEMO_USER: IUser = {id:'demo', name:'Visitante', email:'demo@example.invalid'};
const asUser = (u: SupabaseUser): IUser => ({
  id: u.id,
  name: u.user_metadata?.name || u.email?.split('@')[0] || 'Usuário',
  email: u.email,
});

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let active = true;
    (async () => {
      if (localStorage.getItem(DEMO_SESSION) === 'true') {
        setUser(DEMO_USER); setIsDemo(true); setLoading(false); return;
      }
      try {
        const u = await getSessionUser();
        if (active && u) setUser(asUser(u));
      } catch { if (active) toast.error('Não foi possível recuperar sua sessão.'); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, []);
  const userRegister = async (formData: IRegisterFormValues) => {
    setLoading(true);
    try {
      const response = await signUp({...formData, app:'kenzieburguer'});
      toast.success(response.session
        ? 'Conta criada com sucesso. Faça login.'
        : 'Cadastro recebido. Confirme seu email para ativar a conta.');
      navigate('/');
    } catch (error: any) {
      toast.error(error?.message || 'Não foi possível cadastrar.');
    } finally { setLoading(false); }
  };
  const userLogin = async (formData: ILoginFormValues) => {
    setLoading(true);
    try {
      const response = await signIn(formData);
      if (!response.user?.id) throw new Error('Resposta inválida');
      localStorage.removeItem(DEMO_SESSION);
      setIsDemo(false);
      setUser(asUser(response.user));
      toast.success('Login feito com sucesso!');
      navigate('/shop');
    } catch(error: any) {
      toast.error(error?.message || 'Não foi possível fazer login.');
    } finally { setLoading(false); }
  };
  const startDemo = () => {
    localStorage.setItem(DEMO_SESSION, 'true');
    setIsDemo(true); setUser(DEMO_USER);
    setLoading(false); navigate('/shop');
  };
  const userLogOut = () => {
    localStorage.removeItem(DEMO_SESSION);
    setIsDemo(false); setUser(null);
    void signOut();
    navigate('/');
  };
  return <UserContext.Provider value={{
    loading, setLoading, user, userRegister, userLogin, userLogOut, isDemo, startDemo
  }}>{children}</UserContext.Provider>;
};
