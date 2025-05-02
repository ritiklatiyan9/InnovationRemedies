import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Component/context/AuthContext';

// Component to protect routes that require authentication
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  // If still loading auth state, show a loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 