import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../services/auth';

const PrivateRoute = ({ children, role }) => {
  if (!isAuthenticated()) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  const userRole = getUserRole();

  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];
    if (!allowedRoles.includes(userRole)) {
      // Not authorized for this role
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
