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
    <div>
      <Navbar />
      <h2>Products</h2>

      {allProducts.map((product, index) => (
        <div
          key={index}
          style={{ border: '1px solid gray', margin: 10, padding: 10 }}
        >
          <img src={product.image} width="100" />
          <h4>{product.title}</h4>
          <p>₹{product.price}</p>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
