import axios from 'axios';


const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('API URL:', api.defaults.baseURL);

export const getUsers = async () => {
  try {
    const requestUrl = `${api.defaults.baseURL}/users`;
    console.log('Fetching users from:', requestUrl);

    const response = await api.get('/users');

    console.log('Response data:', response.data);

    return response.data.map(user => ({
      ...user,
      dateOfBirth: user.dateOfBirth || '',
      gender: user.gender || '',
    }));
  } catch (error) {
    console.error('Error fetching users:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);

    console.log('Add user response data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error adding user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);

    console.log(`User with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);

    console.log('Update user response data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
    throw error;
  }
};
