import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// API function to check account
export const checkAccount = async (username, platform) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/check`, {
      username,
      platform
    });
    return response.data;
  } catch (error) {
    console.error('Error checking account:', error);
    throw new Error(error.response?.data?.error || 'Failed to check account');
  }
};

// Get check history
export const getHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw new Error('Failed to fetch history');
  }
};