
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import ProductList from './pages/ProductList/ProductList';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import ProductDetail from './pages/ProductDetail/ProductDetail';

import styles from './styles/App.module.css';
import Navbar from './components/Navbar/Navbar';
import Checkout from './pages/CheckOut/CheckOut';
import Order from './pages/Orders/Orders';
import { CartProvider } from './context/CartContext';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import { ToastContainer } from 'react-toastify';
import './styles/ToastStyles.css';
import AdminProducts from './pages/AdminProducts/AdminProducts';


function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin/products" element={<AdminProducts />} />
            </Routes>
          </main>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
