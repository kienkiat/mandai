
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import ProductList from './pages/ProductList/ProductList';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import ProductDetail from './pages/ProductDetail/ProductDetail';

import styles from './styles/App.module.css';
import Navbar from './components/Navbar/Navbar';
import Checkout from './pages/CheckOut/CheckOut';
import { CartProvider } from './context/CartContext';


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
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
