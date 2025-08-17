// src/services/auth.js
import api from './api';

// 🔐 Handles login and stores both token & role
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });

    const token = response.data.token;
    localStorage.setItem('token', token);

    // ✅ Extract role from the JWT payload
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role; // ✅ Make sure backend includes "role" in the payload

    if (role) {
      localStorage.setItem('role', role);
    }

    return { token, role };
  } catch (error) {
    throw error;
  }
};

// 🔓 Logout function clears auth data
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

// 👤 Decode user from token
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

// 🧑‍💼 Return current role from localStorage
export const getRole = () => {
  return localStorage.getItem('role');
};
