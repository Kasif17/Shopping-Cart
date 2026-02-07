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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-extrabold mb-8 tracking-wide">
          Order History
        </h2>

        {loading && (
          <p className="text-center text-gray-400">
            Loading your orders...
          </p>
        )}

        {!loading && orders.length === 0 && (
          <p className="text-center text-gray-400">
            You haven’t placed any orders yet
          </p>
        )}

        <div className="space-y-8">
          {!loading &&
            orders.map(order => (
              <div
                key={order._id}
                className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Order ID
                    </p>
                    <p className="font-semibold break-all">
                      {order._id}
                    </p>
                  </div>

                  <div className="text-sm text-gray-400 mt-3 sm:mt-0">
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>

                <hr className="border-gray-800 mb-6" />

                {/* Order Items */}
                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-5"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain bg-black rounded border border-gray-800"
                      />

                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <p className="text-red-500 font-bold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
