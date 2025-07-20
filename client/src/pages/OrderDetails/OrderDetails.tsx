
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserOrderById } from '../../api/orderApi';
import styles from './OrderDetails.module.css';
import { format } from 'date-fns';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl?: string;
  description?: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: string;
  product: Product;
}

interface Order {
  id: number;
  orderDate: string;
  totalPrice: string;
  orderItems: OrderItem[];
}

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getUserOrderById(Number(id));
        console.log(res);
        setOrder(res.data);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div className={styles.container}><p>Loading order...</p></div>;
  if (!order) return <div className={styles.container}><p>Order not found.</p></div>;

  return (
    <div className={styles.container}>
      <h1>Order #{order.id}</h1>
      <p className={styles.date}>
      Placed on: {format(new Date(order.orderDate), "do MMMM yyyy h:mm a")}
      </p>

      <div className={styles.orderItems}>
        {order.orderItems.map(item => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.itemInfo}>
              {item.product.imageUrl && (
                <img
                  src={API_BASE_URL + item.product.imageUrl}
                  alt={item.product.name}
                  className={styles.itemImage}
                />
              )}
              <div className={styles.info}>
                <h3>{item.product.name}</h3>
                <p>Unit Price: ${parseFloat(item.price).toFixed(2)}</p>
              </div>
            </div>
            <div className={styles.itemDetails}>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <strong>Total Price: ${parseFloat(order.totalPrice).toFixed(2)}</strong>
      </div>

      <Link to="/orders" className={styles.backLink}>← Back to Orders</Link>
    </div>
  );
};

export default OrderDetails;
