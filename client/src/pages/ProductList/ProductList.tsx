import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import styles from './ProductList.module.css';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;
  status: number;
  createdAt: string;
  imageUrl?: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/products?page=${page}&limit=${limit}`);
        setProducts(res.data.data);
        setTotal(res.data.pagination.total);
      } catch {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product List</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </ul>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
};

export default ProductList;
