// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Intercept each request to optionally add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  // Don't add Authorization header for /auth/login
  if (token && !config.url.includes('/auth/login')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
