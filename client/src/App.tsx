// src/App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import ProductList from './pages/ProductList/ProductList';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import ProductDetail from './pages/ProductDetail/ProductDetail';

import SideMenu from './components/SideMenu/SideMenu';
import styles from './styles/App.module.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <header className={styles.header}>
          <button
            onClick={() => setMenuOpen(true)}
            className={styles.menuButton}
            aria-label="Open menu"
          >
            ☰
          </button>

          <h1 className={styles.title}>
            <Link to="/" className={styles.titleLink}>
              Mandai Shop
            </Link>
          </h1>
        </header>

        <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
