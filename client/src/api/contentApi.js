import axios from 'axios';

const createContent = async (contentData) => {
  const response = await axios.post('/api/contents/create', contentData);
  return response.data;
};

const getContents = async () => {
  const response = await axios.get('/api/contents');
  return response.data;
};

export { createContent, getContents };
