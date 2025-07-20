import { useCart } from '../../context/CartContext';
import { addToCart, placeOrder } from '../../api/cartApi';
import styles from './CheckOut.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Checkout = () => {
    const { items, summary, refreshCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const updateQuantity = async (productId: number, action: 'add' | 'minus') => {
        try {
            setLoading(true);
            await addToCart(productId, 1, action);
            await refreshCart();
        } catch (err) {
            console.error(err);
            setError('Failed to update cart.');
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await placeOrder();
            await refreshCart(); // Clear the cart
            toast.success('Order placed successfully!', {className: 'toast-success-custom'});
            navigate('/orders');
        } catch (err) {
            setError('Failed to place order. Please try again.');
            toast.error('Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.checkoutContainer}>
            <h1>Checkout</h1>

            {loading && <p>Updating cart...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {items.length === 0 && <p>Your cart is empty.</p>}

            {items.length > 0 && (
                <>
                    <div className={styles.cartItems}>
                        {items.map(({ id, product, quantity }) => (
                            <div key={id} className={styles.cartItem}>
                                <img
                                    src={API_BASE_URL + product.imageUrl}
                                    alt={product.name}
                                    className={styles.productImage}
                                />
                                <div className={styles.productDetails}>
                                    <h3 className={styles.productName}>{product.name}</h3>
                                    <p className={styles.productDesc}>{product.description}</p>
                                    <div className={styles.qtyPrice}>
                                        <div className={styles.quantityContainer}>
                                            <button
                                                onClick={() => updateQuantity(product.id, 'minus')}
                                                disabled={quantity <= 1 || loading}
                                                className={styles.quantityBtn}
                                            >
                                                −
                                            </button>
                                            <span className={styles.quantity}>{quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(product.id, 'add')}
                                                disabled={loading}
                                                className={styles.quantityBtn}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span>Price: ${(product.price * quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {summary && (
                        <div className={styles.summary}>
                            <p><strong>Total Items:</strong> {summary.totalItems}</p>
                            <p><strong>Total Price:</strong> ${summary.totalPrice.toFixed(2)}</p>
                        </div>
                    )}

                    <button
                        className={styles.placeOrderBtn}
                        onClick={handlePlaceOrder}
                        disabled={loading || !summary || summary.totalItems === 0}
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </>
            )}
        </div>
    );
};

export default Checkout;
