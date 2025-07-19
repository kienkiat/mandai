import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProductCard = ({ id, name, description, price, imageUrl }: Product) => {
  return (
    <li className={styles.card}>
      <Link to={`/products/${id}`} className={styles.link}>
      {imageUrl && (
        <img src={API_BASE_URL + imageUrl} alt={name} className={styles.image} />
      )}
      <div className={styles.name}>
        {name}
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.price}>${parseFloat(price).toFixed(2)}</div>
      </Link>
    </li>
  );
};

export default ProductCard;
