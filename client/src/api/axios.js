import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shopping-cart-5-0wym.onrender.com'  
});

export const setToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = token;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
