import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserAuthenticated } from './authUtils';

const ProtectedUserRoute = ({ children }) => {
  return isUserAuthenticated() ? children : <Navigate to="/" />;
};

export default ProtectedUserRoute;
