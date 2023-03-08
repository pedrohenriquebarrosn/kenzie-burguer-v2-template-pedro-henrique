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
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  </>
);

export default App;
