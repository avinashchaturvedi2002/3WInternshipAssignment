import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const apiService = {
  getUsers: async (page, pageSize) => {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      params: { page, pageSize },
    });
    console.log(response.data);
    return response.data;
  },

  
  addUser: async (name) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/`, { name });
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  
  claimPoints: async (userId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/claim-points`, { userId });
      return response.data;
    } catch (error) {
      console.error('Error claiming points:', error);
      throw error;
    }
  },

 
  getClaimHistory: async (page = 1, pageSize = 10, userName = '', userId = '') => {
    try {
      console.log(userName);
      const response = await axios.get(`${API_BASE_URL}/claim/claim-history`, {
        params: { page, pageSize, userName, userId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching claim history:', error);
      throw error;
    }
  }
};

export default apiService;