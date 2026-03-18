/*import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  // If we get a token, store it in local storage
  if (response.data.token) {
    localStorage.setItem('userToken', response.data.token);
  }
  return response.data;
};*/
// client/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // CRITICAL: This sends the data back to AuthPage
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};