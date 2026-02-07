import { useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    if (!title || !price || !image) {
      alert('All fields required');
      return;
    }

    await api.post('/products', { title, price, image });
    alert('Product added successfully');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-10">
        <div className="bg-black/80 backdrop-blur-md border border-gray-800 rounded-lg shadow-2xl p-8">
          
          <h2 className="text-3xl font-extrabold text-center text-red-600 tracking-wide mb-2">
            Add New Product
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Create a new product for your store
          </p>

          <div className="space-y-5">
            <input
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Product title"
              onChange={e => setTitle(e.target.value)}
            />

            <input
              type="number"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Price"
              onChange={e => setPrice(e.target.value)}
            />

            <input
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Image URL"
              onChange={e => setImage(e.target.value)}
            />

            <button
              onClick={submit}
              className="w-full bg-red-600 text-white py-3 rounded font-semibold text-lg hover:bg-red-700 transition"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
