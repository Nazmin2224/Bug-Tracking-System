import { jwtDecode } from 'jwt-decode';


import axios from './api';



export const login = async (username, password) => {
  const res = await axios.post('/auth/login', { username, password });

  // Save token and role to localStorage
  const { token, role, username: name } = res.data;

  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
  localStorage.setItem('username', name);

  return { token, role };
};
// Logout - clears the stored token
export const logout = () => {
  localStorage.removeItem('token');
};

// Get current user info by decoding JWT token
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};
export const getUsername = () => {
  const user = getCurrentUser();
  return user?.sub || user?.username || 'User';
};
// Get user role from token
export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role?.toUpperCase() || null;
};


// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // or wherever you store JWT
  return !!token; // returns true if token exists, else false
};
