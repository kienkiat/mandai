import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import styles from '../components/ProductList.module.css';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;  // price comes as string
  status: number;
  createdAt: string;
  imageUrl?: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`/products?page=${page}&limit=${limit}`);
        setProducts(res.data.data);
        setTotal(res.data.pagination.total);
      } catch (err: any) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  const handleNext = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };
  
  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>Product List</h1>
      <ul className={styles.list}>
        {products.map((p) => (
          <li key={p.id} className={styles.listItem}>
            {p.imageUrl && (
              <img
                src={API_BASE_URL + p.imageUrl}
                alt={p.name}
                className={styles.image}
              />
            )}
            <Link to={`/products/${p.id}`} className={styles.productName}>
              {p.name}
            </Link>
            <p className={styles.description}>{p.description}</p>
            <div className={styles.price}>${parseFloat(p.price).toFixed(2)}</div>
          </li>
        ))}
      </ul>

      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
