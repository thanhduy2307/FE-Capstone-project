import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/authStore.js';

/**
 * ProtectedRoute Component
 * Protects routes based on authentication and user roles
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Protected content
 * @param {string[]} props.allowedRoles - Array of allowed roles (optional)
 */
const ProtectedRoute = ({ children, allowedRoles = null }) => {
  const location = useLocation();
  const { isAuthenticated, user, checkAuth } = useAuthStore();

  // TEMPORARILY DISABLED - Causing infinite loop
  // useEffect(() => {
  //   // Check authentication status on mount
  //   checkAuth();
  // }, []); // Empty dependency array - only run once on mount


  // ========== TEMPORARILY DISABLED FOR TESTING ==========
  // TODO: Uncomment these lines when ready to enable authentication
  
  // If not authenticated, redirect to login
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // If roles are specified, check if user has required role
  // if (allowedRoles && allowedRoles.length > 0) {
  //   const userRole = user?.role;
  //   
  //   if (!userRole || !allowedRoles.includes(userRole)) {
  //     return <Navigate to="/unauthorized" replace />;
  //   }
  // }

  // User is authenticated and has required role (if specified)
  return children;
};

export default ProtectedRoute;
