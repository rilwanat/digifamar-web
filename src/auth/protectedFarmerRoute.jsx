import React from 'react';
import { Navigate } from 'react-router-dom';
import { isFarmerAuthenticated } from './authUtils';

const protectedFarmerRoute = ({ children }) => {
  return isFarmerAuthenticated() ? children : <Navigate to="/" />;
};

export default protectedFarmerRoute;
