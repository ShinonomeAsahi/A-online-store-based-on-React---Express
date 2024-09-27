import axios from 'axios';

const createEvent = async (eventData) => {
  const response = await axios.post('/api/events/create', eventData);
  return response.data;
};

const getEvents = async () => {
  const response = await axios.get('/api/events');
  return response.data;
};

export { createEvent, getEvents };
