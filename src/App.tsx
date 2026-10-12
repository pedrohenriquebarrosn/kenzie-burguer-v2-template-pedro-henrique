import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './providers/CartContext/CartContext';
import { UserProvider } from './providers/UserContext/UserContext';
import Router from './Routes/routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <>
    <UserProvider>
      <CartProvider>
        <GlobalStyles />
        <Router />
      </CartProvider>
    </UserProvider>
    <ToastContainer
      position='top-right'
      autoClose={2500}
      limit={2}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme='light'
    />
  </>
);

export default App;
