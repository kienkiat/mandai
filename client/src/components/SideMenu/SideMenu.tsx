// src/components/SideMenu.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './SideMenu.module.css';
import { toast } from 'react-toastify';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    toast.success('Logout successfully!', { className: 'toast-success-custom' });
    navigate('/');
  };

  return (
    <div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
      <button onClick={onClose} className={styles.closeButton} aria-label="Close menu">
        ✕
      </button>
      <ul className={styles.menuList}>
        {user && (
          <li className={styles.menuItem} style={{ fontWeight: 'bold', color: '#003400', fontStyle: 'italic' }}>
            Welcome back, {user.username}!
          </li>
        )}
        <li className={styles.menuItem}>
          <Link to="/" onClick={onClose} className={styles.menuLink}>
            Home
          </Link>
        </li>
        {user?.role === 'admin' && (
          <li className={styles.menuItem}>
            <Link to="/admin/products" onClick={onClose} className={styles.menuLink}>
              Manage Products
            </Link>
          </li>
        )}
        {!user ? (
          <>
            <li className={styles.menuItem}>
              <Link to="/login" onClick={onClose} className={styles.menuLink}>
                Login
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/signup" onClick={onClose} className={styles.menuLink}>
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className={styles.menuItem}>
              <Link to="/orders" onClick={onClose} className={styles.menuLink}>
                My Orders
              </Link>
            </li>
            <li className={styles.menuItem}>
              <button onClick={handleLogout} className={styles.menuLink} style={{ background: 'none', border: 'none', padding: 0 }}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideMenu;
