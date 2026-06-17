import axios from 'axios';

// Use environment variable for API URL or default to localhost
const API_URL = '/api/auth';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const register = async (username: string, email: string, password: string, role: string = 'user') => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password, role });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

export const saveQuizScore = async (storyTitle: string, score: number, totalQuestions: number, percentage: number) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.post(`${API_URL}/scores`, { storyTitle, score, totalQuestions, percentage }, config);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to save quiz score';
  }
};
