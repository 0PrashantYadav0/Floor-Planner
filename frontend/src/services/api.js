import axios from 'axios';
import API_BASE_URL from '../config/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
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

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Bookings API
export const bookingsAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getAll: () => api.get('/bookings'),
  getFloors: () => api.get('/bookings/floors'),
};

// Admin API
export const adminAPI = {
  getUserRole: () => api.get('/admin/user-role'),
  getFloors: () => api.get('/admin/floors'),
  addFloor: (floorData) => api.post('/admin/add-floor', floorData),
  removeFloor: (floorId) => api.delete(`/admin/remove-floor/${floorId}`),
  addRoom: (floorId, roomData) => api.post(`/admin/add-room/${floorId}`, roomData),
  updateRoom: (floorId, roomId, roomData) => api.put(`/admin/update-room/${floorId}/${roomId}`, roomData),
  removeRoom: (floorId, roomId) => api.delete(`/admin/remove-room/${floorId}/${roomId}`),
};

// Suggestion API
export const suggestionAPI = {
  suggestRooms: (criteria) => api.post('/suggest-rooms', criteria),
};

export default api;

