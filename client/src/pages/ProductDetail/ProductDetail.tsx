// src/pages/ProductDetail.tsx
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styles from '../../components/ProductDetail/ProductDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login', { state: { from: `/products/${id}` } });
            return;
        }

        try {
            await axios.post('/cart', {
                productId: product?.id,
                quantity: 1,
            });
            alert('Product added to cart!');
        } catch (err) {
            console.error(err);
            alert('Failed to add to cart');
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/products/${id}`);
                setProduct(res.data.data);
                console.log(res);
            } catch (err) {
                setError('Product not found');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

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
            <button className={styles.addToCartButton} onClick={handleAddToCart}>
                Add to Cart
            </button>

        </div>
    );
};

export default ProductDetail;
