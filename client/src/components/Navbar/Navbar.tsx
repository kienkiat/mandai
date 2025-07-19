import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>Home</Link>
        <button className={styles.menuButton} onClick={toggleMenu}>
          ☰
        </button>
      </header>

      <div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={closeMenu}>×</button>

        {!user ? (
          <>
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <Link to="/signup" onClick={closeMenu}>Signup</Link>
          </>
        ) : (
          <>
            <span className={styles.user}>Hi, {user.username}</span>
            <Link to="/orders" onClick={closeMenu}>My Orders</Link>
            <button className={styles.logoutBtn} onClick={() => { logout(); closeMenu(); }}>
              Logout
            </button>
          </>
        )}
      </div>

      {isOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;
