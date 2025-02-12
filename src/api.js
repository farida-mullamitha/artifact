import axios from 'axios';
const API_URL = 'https://dummyjson.com/auth';

// Login API
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Login failed';
  }
};

// Fetch User Details
export const getUserDetails = async token => {
  try {
    const response = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Unauthorized: Invalid token');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
