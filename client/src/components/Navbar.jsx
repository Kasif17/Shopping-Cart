import "../index.css";
import { useNavigate } from 'react-router-dom';
import api, { setToken } from '../api/axios';

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post('/users/logout');
    } catch (err) {
      console.log('Logout failed or token expired');
    } finally {
      localStorage.removeItem('token');
      setToken(null);       
      navigate('/login');
    }
  };

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      
      <h1
        className="text-2xl font-extrabold text-red-600 cursor-pointer tracking-wide"
        onClick={() => navigate('/home')}
      >
        SHOPNOW
      </h1>

      <div className="flex items-center gap-6 text-sm font-medium">
        <button onClick={() => navigate('/home')} className="text-gray-300 hover:text-white transition">
          Home
        </button>

        <button onClick={() => navigate('/cart')} className="text-gray-300 hover:text-white transition">
          Cart
        </button>

        <button onClick={() => navigate('/orders')} className="text-gray-300 hover:text-white transition">
          Orders
        </button>

        <button onClick={() => navigate('/add-product')} className="text-gray-300 hover:text-white transition">
          Add Product
        </button>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
