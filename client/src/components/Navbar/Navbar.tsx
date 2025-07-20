import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import styles from './Navbar.module.css';
import SideMenu from '../SideMenu/SideMenu';
import CartMenu from '../CartMenu/CartMenu';
import cartIcon from '../../assets/cart.svg';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setCartOpen((prev) => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <button className={styles.menuButton} onClick={() => setMenuOpen(true)}>☰</button>

        <h1 className={styles.logo}>
          <Link to="/">Mandai Shop</Link>
        </h1>

        <button className={styles.cartButton} onClick={toggleCart} aria-label="Cart">
          <img src={cartIcon} alt="Cart" />
          {user && cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </button>
      </header>

      <SideMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
      <CartMenu isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
