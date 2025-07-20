import { useEffect, useState } from 'react';
import styles from './CartMenu.module.css';
import { getCartItems, addToCart, clearCart } from '../../api/cartApi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import binIcon from '../../assets/bin.svg';


interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface CartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartMenu = ({ isOpen, onClose }: CartMenuProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const { user } = useAuth();

  const fetchCart = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getCartItems();
      setItems(res.data.data);
      await refreshCart();
    } catch (err: any) {
      console.error(err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      if (!user) {
        return;
      }
    }
    if (user) {
      fetchCart();
    }
  }, [isOpen, user]);

  const updateQuantity = async (productId: number, action: 'add' | 'minus') => {
    try {
      setLoading(true);
      await addToCart(productId, 1, action);
      await fetchCart();
    } catch (err) {
      console.error(err);
      setError('Failed to update cart');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      setLoading(true);
      await addToCart(productId, 1, 'remove');
      await fetchCart();
    } catch (err) {
      console.error(err);
      setError('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    try {
      setLoading(true);
      await clearCart();  // API call to clear cart
      setItems([]); // Clear the items in the state as well
    } catch (error) {
      console.error(error);
      setError('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };
  

  const total = items
    .reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div className={`${styles.cartMenu} ${isOpen ? styles.open : ''}`}>
        <button className={styles.cartCloseButton} onClick={onClose}>×</button>
        <h2 className={styles.cartTitle}>Your Cart</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && items.length === 0 && <p>Your cart is empty.</p>}

        {!loading && !error && items.length > 0 && (
          <>
            <div className={styles.cartList}>
              {items.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  {item.product.imageUrl && (
                    <img
                      src={process.env.REACT_APP_API_BASE_URL + item.product.imageUrl}
                      alt={item.product.name}
                      className={styles.cartItemImage}
                    />
                  )}
                  <div className={styles.cartItemInfo}>
                    <div className={styles.cartItemName}>{item.product.name}</div>
                    <div className={styles.cartItemDetails}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.product.id, 'minus')}
                        disabled={loading || item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.product.name}`}
                      >
                        −
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.product.id, 'add')}
                        disabled={loading}
                        aria-label={`Increase quantity of ${item.product.name}`}
                      >
                        +
                      </button>
                      <span>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeItem(item.product.id)}
                        disabled={loading}
                        aria-label={`Remove ${item.product.name} from cart`}
                        title="Remove item"
                      >
                        <img src={binIcon} alt="Remove item" className={styles.removeIcon} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cartTotal}>
              <strong>Total:</strong> ${total}
            </div>

            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Go to Checkout
            </button>
            <button
              className={styles.clearAllButton}
              onClick={handleClearCart}
              disabled={loading || items.length === 0}
              title="Clear all items from cart"
            >
              Clear All
            </button>
          </>
        )}
      </div>

      {isOpen && <div className={styles.overlay} onClick={onClose} />}
    </>
  );
};

export default CartMenu;
