import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/axios';
import Navbar from '../components/Navbar';

export default function Home() {
  const [fakeProducts, setFakeProducts] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fakeRes = await axios.get('https://fakestoreapi.com/products');
      const dbRes = await api.get('/products');

      setFakeProducts(fakeRes.data);
      setDbProducts(dbRes.data);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setAllProducts([...dbProducts, ...fakeProducts]);
  }, [fakeProducts, dbProducts]);

  const addToCart = async (product) => {
    await api.post('/carts', { product });
    alert('Item added to cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-extrabold mb-8 tracking-wide">
          Browse Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allProducts.map((product, index) => (
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
      </div>
    </div>
  );
}
