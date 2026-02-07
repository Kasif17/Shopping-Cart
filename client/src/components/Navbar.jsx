import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await api.post('/users/logout');
    localStorage.clear();
    alert('Logged out');
    navigate('/');
  };

  return (
    <div>
      <button onClick={() => navigate('/home')}>Home</button>
      <button onClick={() => navigate('/cart')}>Cart</button>
      <button onClick={() => navigate('/orders')}>Orders</button>
      <button onClick={() => navigate('/add-product')}>Add Product</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
