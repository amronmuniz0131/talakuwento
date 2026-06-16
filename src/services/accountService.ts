import axios from 'axios';

const API_URL = 'http://localhost:5000/api/accounts';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getAccounts = async (page = 1, limit = 10, search = '') => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to fetch accounts';
  }
};

export const updateAccount = async (id: string, data: { username?: string, email?: string, password?: string, role?: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to update account';
  }
};

export const deleteAccount = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to delete account';
  }
};

export const getQuizResults = async (page = 1, limit = 10, search = '') => {
  try {
    const response = await axios.get(`${API_URL}/quiz-results?page=${page}&limit=${limit}&search=${search}`, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to fetch quiz results';
  }
};
