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
    <div>
      <Navbar />
      <h2>Add Product</h2>

      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Image URL" onChange={e => setImage(e.target.value)} />

      <br /><br />
      <button onClick={submit}>Add Product</button>
    </div>
  );
}
