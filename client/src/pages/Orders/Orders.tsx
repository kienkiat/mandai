import { useEffect, useState } from 'react';
import { getUserOrders } from '../../api/orderApi';
import styles from './Orders.module.css';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl?: string;
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

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getUserOrders(page, 10);
        console.log(res);
        setOrders(res.data);
        const { total, limit } = res.pagination;
        setTotalPages(Math.ceil(total / limit));
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  return (
    <div className={styles.container}>
      <h1>My Orders</h1>

      {loading && <p>Loading orders...</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}

      <div className={styles.orderList}>
        {orders.map(order => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.header}>
              <span><strong>Order #{order.id}</strong></span>
              <span>{new Date(order.orderDate).toLocaleDateString()}</span>
              <span className={styles.total}>Total: ${parseFloat(order.totalPrice).toFixed(2)}</span>
            </div>

            <div className={styles.itemsPreview}>
              {order.orderItems.slice(0, 3).map((item, idx) => (
                <div key={idx} className={styles.previewItem}>
                  <div className={styles.itemInfo}>
                    {item.product.imageUrl && (
                      <img
                        src={API_BASE_URL + item.product.imageUrl}
                        alt={item.product.name}
                        className={styles.itemImage}
                      />
                    )}
                    <span>{item.product.name}</span>
                  </div>
                  <span>×{item.quantity}</span>
                </div>
              ))}
              {order.orderItems.length > 3 && (
                <div className={styles.more}>+{order.orderItems.length - 3} more...</div>
              )}
            </div>

            <Link to={`/orders/${order.id}`} className={styles.detailsLink}>
              View Details →
            </Link>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
