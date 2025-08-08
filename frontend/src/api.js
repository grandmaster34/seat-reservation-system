 // frontend/src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust based on backend port

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers if exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // store JWT token in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
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
  // Register a new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout user (client-side)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Reservation API
export const reservationAPI = {
  // Get all reservations (admin only)
  getAllReservations: async () => {
    const response = await api.get('/reservations');
    return response.data;
  },

  // Get user's reservations
  getUserReservations: async () => {
    const response = await api.get('/reservations/user');
    return response.data;
  },

  // Create a new reservation
  createReservation: async (reservationData) => {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  },

  // Get a specific reservation
  getReservation: async (id) => {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },

  // Update a reservation
  updateReservation: async (id, updateData) => {
    const response = await api.put(`/reservations/${id}`, updateData);
    return response.data;
  },

  // Delete a reservation
  deleteReservation: async (id) => {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
  }
};

// Seat API
export const seatAPI = {
  // Get all seats
  getAllSeats: async () => {
    const response = await api.get('/seats');
    return response.data;
  },

  // Get available seats for a specific date and time
  getAvailableSeats: async (date, timeSlot) => {
    const response = await api.get('/seats/available', {
      params: { date, timeSlot }
    });
    return response.data;
  },

  // Create a new seat (admin only)
  createSeat: async (seatData) => {
    const response = await api.post('/seats', seatData);
    return response.data;
  },

  // Get a specific seat
  getSeat: async (id) => {
    const response = await api.get(`/seats/${id}`);
    return response.data;
  },

  // Update a seat (admin only)
  updateSeat: async (id, updateData) => {
    const response = await api.put(`/seats/${id}`, updateData);
    return response.data;
  },

  // Delete a seat (admin only)
  deleteSeat: async (id) => {
    const response = await api.delete(`/seats/${id}`);
    return response.data;
  }
};

// Test API
export const testAPI = {
  // Test database connection
  testDB: async () => {
    const response = await api.get('/test/test-db');
    return response.data;
  }
};

export default api;
