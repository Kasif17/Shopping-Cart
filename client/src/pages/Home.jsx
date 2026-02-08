import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [fakeRes, dbRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          api.get('/products')
        ]);

        setProducts([...dbRes.data, ...fakeRes.data]);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          alert('Failed to load products');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [navigate]);

  const addToCart = async (product) => {
    try {
      await api.post('/carts', { product });
      alert('Item added to cart');
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert('Failed to add item to cart');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-extrabold mb-8 tracking-wide">
          Browse Products
        </h2>
        {loading && (
          <p className="text-center text-gray-400">
            Loading products...
          </p>
        )}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-400">
            No products available
          </p>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 p-4 flex flex-col border border-gray-800"
              >
                <div className="h-48 flex items-center justify-center mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full object-contain"
                  />
                </div>

                <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                  {product.title}
                </h4>

                <p className="text-red-500 font-bold mb-4">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
