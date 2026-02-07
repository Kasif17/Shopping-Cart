import { useState } from 'react';
import api, { setToken } from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post('/users/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      alert('Login successful');
      navigate('/home');
    } catch (err) {
      if (err.response?.status === 403) {
        alert('You are already logged in on another device');
      } else {
        alert('Invalid username/password');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <p onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
        New user? Signup
      </p>
    </div>
  );
}
