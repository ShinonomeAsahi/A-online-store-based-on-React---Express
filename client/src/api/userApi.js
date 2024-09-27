// frontend/src/api/userApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/user';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  const token = response.data.token;
  
  if (token) {
    localStorage.setItem('token', token);
  }

  return response.data;
};

const getProfile = async () => {
  const token = localStorage.getItem('token');
  
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.data;
};

export { register, login, getProfile };
