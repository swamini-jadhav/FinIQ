import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 300000
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  logout: () => api.post('/api/auth/logout'),
  getCurrentUser: () => api.get('/api/auth/user'),
  updateFavorites: (data) => api.put('/api/auth/favorites', data)
};

// ML API
export const mlAPI = {
  predict: (ticker) => api.post('/api/ml/predict', { ticker }),
  newsSentiment: (ticker, company) => api.post('/api/ml/news-sentiment', { ticker, company }),
  recommendation: (ticker, company) => api.post('/api/ml/recommendation', { ticker, company }),
  checkHealth: () => api.get('/api/ml/health')
};

// Chatbot API
export const chatbotAPI = {
  sendMessage: (message, context) => api.post('/api/chatbot/query', { message, context }),
  sendFeedback: (data) => api.post('/api/chatbot/feedback', data)
};

export default api;
