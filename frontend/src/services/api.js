import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data.map(user => ({
      ...user,
      dateOfBirth: user.dateOfBirth || '',
      gender: user.gender || '',
    }));
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }
};
