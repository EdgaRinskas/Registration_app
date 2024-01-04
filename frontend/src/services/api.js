import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const addUser = async (userData) => {
  const { data } = await api.post('/users', userData);
  return data;
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};
