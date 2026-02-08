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


api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      setToken(null);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;


