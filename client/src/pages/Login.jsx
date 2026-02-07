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
      navigate('/home');
    } catch (err) {
      if (err.response?.status === 403) {
        alert('You are already logged in on another device.');
      } else {
        alert('Invalid username or password.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
      <div className="bg-black/80 backdrop-blur-md rounded-lg shadow-2xl p-10 w-full max-w-md border border-gray-800">
        
        {/* Brand */}
        <h1 className="text-4xl font-extrabold text-red-600 text-center tracking-wide">
          Welcome to Shopping Cart ! 
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Sign in to continue
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            className="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition"
          >
            Sign In
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          New to our platform?
          <span
            onClick={() => navigate('/signup')}
            className="text-white cursor-pointer ml-1 hover:underline"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
