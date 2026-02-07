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
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <Navbar />
        <p className="text-center mt-12 text-gray-400">
          Loading your cart...
        </p>
      </div>
    );
  }

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-extrabold mb-8 tracking-wide">
          Your Cart
        </h2>

        {cart.items.length === 0 && (
          <p className="text-gray-400">
            Your cart is currently empty
          </p>
        )}

        <div className="space-y-6">
          {cart.items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex items-center gap-5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain bg-black rounded"
              />

              <div className="flex-1">
                <h4 className="font-semibold line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm mt-1">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <p className="text-red-500 font-bold text-lg">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {cart.items.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 mt-8 p-6 rounded-lg">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total Amount</span>
              <span className="text-red-500">₹{totalAmount}</span>
            </div>

            <button
              onClick={checkout}
              className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
