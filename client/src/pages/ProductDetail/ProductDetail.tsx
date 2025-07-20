import { useEffect, useState } from 'react';
import styles from '../../components/ProductDetail/ProductDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { addToCart } from '../../api/cartApi';
import { fetchProductById } from '../../api/productApi';
import { useCart } from '../../context/CartContext'; 
import { toast } from 'react-toastify';
import '../../styles/global.module.css';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: string;
    status: number;
    createdAt: string;
    imageUrl?: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { user } = useAuth();
    const { refreshCart } = useCart();

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login', { state: { from: `/products/${id}` } });
            return;
        }

        try {
            await addToCart(product!.id, quantity);
            await refreshCart();  
            toast.success('Added to cart!', {className: 'toast-success-custom'});
        } catch (err) {
            console.error(err);
            toast.error('Failed to add to cart');
        }
    };

    useEffect(() => {
        const loadProduct = async () => {
          try {
            const res = await fetchProductById(id!);
            setProduct(res.data);
          } catch {
            setError('Product not found');
          } finally {
            setLoading(false);
          }
        };
    
        loadProduct();
    }, [id]);

    const increaseQuantity = () => setQuantity(q => q + 1);
    const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!product) return null;

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                ← Back
            </button>
            <h1 className={styles.name}>{product.name}</h1>
            {product.imageUrl && (
                <img
                    src={API_BASE_URL + product.imageUrl}
                    alt={product.name}
                    className={styles.images}
                />
            )}
            <p className={styles.description}>{product.description}</p>
            <div className={styles.price}>${parseFloat(product.price).toFixed(2)}</div>

            <div className={styles.quantityContainer} style={{ margin: '1rem 0', display: 'flex', alignItems: 'center' }}>
              <button onClick={decreaseQuantity} style={{ padding: '0.5rem', fontSize: '1.2rem' }}>−</button>
              <span style={{ margin: '0 1rem', fontSize: '1.2rem' }}>{quantity}</span>
              <button onClick={increaseQuantity} style={{ padding: '0.5rem', fontSize: '1.2rem' }}>+</button>
            </div>

            <button className={styles.addToCartButton} onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetail;
