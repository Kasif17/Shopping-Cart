import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

export default function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/items').then(res => setItems(res.data));
  }, []);

  const addToCart = async (id) => {
    await api.post('/carts', { itemId: id });
    alert('Item added to cart');
  };

  return (
    <div>
      <Navbar />
      <h3>Items</h3>
      {items.map(item => (
        <div key={item._id} onClick={() => addToCart(item._id)}>
          {item.name} - ₹{item.price}
        </div>
      ))}
    </div>
  );
}
