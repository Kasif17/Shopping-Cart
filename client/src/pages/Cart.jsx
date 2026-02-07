import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get('/carts')
      .then(res => setCart(res.data))
      .catch(() => alert('Failed to load cart'))
      .finally(() => setLoading(false));
  }, []);

  const checkout = async () => {
    if (!cart || cart.items.length === 0) {
      alert('Cart is empty');
      return;
    }

    try {
      await api.post('/orders', { items: cart.items });

      alert('Order successfully placed');
      await api.delete('/carts');

      navigate('/home');
    } catch {
      alert('Failed to place order');
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h2>Cart</h2>

      {cart.items.length === 0 && <p>No items in cart</p>}

      {cart.items.map((item, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <img src={item.image} width="50" />
          <span>
            {item.title} - ₹{item.price} × {item.quantity} <p> Total Amout: ₹{item.price*item.quantity}</p>
          </span>
        </div>
      ))}

      <br />
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
