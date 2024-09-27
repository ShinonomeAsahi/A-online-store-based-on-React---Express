import axios from 'axios';

const createProduct = async (productData) => {
  const response = await axios.post('/api/products/create', productData);
  return response.data;
};

const getProducts = async () => {
  const response = await axios.get('/api/products');
  return response.data;
};

export { createProduct, getProducts };
