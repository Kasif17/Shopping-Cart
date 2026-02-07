import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch {
        alert('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>My Orders</h2>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p>No orders found</p>
      )}

      {!loading &&
        orders.map(order => (
          <div
            key={order._id}
            style={{
              border: '1px solid #ccc',
              margin: 10,
              padding: 10
            }}
          >
            <p><b>Order ID:</b> {order._id}</p>
            <p>
              <b>Date:</b>{' '}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <b>Time:</b>{' '}
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>

            <hr />

            {order.items.map((item, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <img src={item.image} width="40" />
                <span>
                  {item.title} — ₹{item.price} × {item.quantity}
                </span>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
