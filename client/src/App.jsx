import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders'; 
import { setToken } from './api/axios';
import AddProduct from './pages/AddProduct';

const token = localStorage.getItem('token');
if (token) {
  setToken(token);
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/" />}
        />

        <Route
          path="/cart"
          element={token ? <Cart /> : <Navigate to="/" />}
        />

        <Route
          path="/orders"
          element={token ? <Orders /> : <Navigate to="/" />}
        />
         <Route
          path="/add-product"
          element={token ? <AddProduct /> : <Navigate to="/" />}
        />
      </Routes>
      
    </BrowserRouter>
  );
}
