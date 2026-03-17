import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from './authUtils';

const protectedAdminRoute = ({ children }) => {
  return isAdminAuthenticated() ? children : <Navigate to="/" />;
};

export default protectedAdminRoute;
