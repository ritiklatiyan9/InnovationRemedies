import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the Auth Context
const AuthContext = createContext(null);

// Base API URL
const API_URL = 'https://innovation-backend.vercel.app/api/v1';

// Create the Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        await refreshToken();
        setLoading(false);
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Axios instance with credentials
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // Interceptor to handle token refresh
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && 
          !originalRequest._retry &&
          !originalRequest.url?.includes('refresh-token')) {
        originalRequest._retry = true;
        
        try {
          await refreshToken();
          return api(originalRequest);
        } catch (refreshError) {
          logout();
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );

  // User registration
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/users/register', userData);
      
      if (response.data?.data?.user) {
        setUser(response.data.data.user);
      }
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // User login
  const login = async (mobile, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/users/login', { mobile, password });
      
      setUser(response.data.data.user);
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Refresh token
  const refreshToken = async () => {
    try {
      const response = await api.post('/users/refresh-token');
      
      if (response.data?.data?.user) {
        setUser(response.data.data.user);
      } else if (response.data?.data?.accessToken) {
        await getUserProfile();
      }
      
      return response.data;
    } catch (err) {
      setUser(null);
      throw err;
    }
  };

  // Get user profile (assuming this exists or can be added)
  const getUserProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setUser(response.data.data.user);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      throw err;
    }
  };

  // User logout
  const logout = async () => {
    try {
      setLoading(true);
      await api.post('/users/logout');
      setUser(null);
      setLoading(false);
    } catch (err) {
      console.error("Logout error:", err);
      setUser(null);
      setLoading(false);
    }
  };

  // Clear any error messages
  const clearError = () => {
    setError(null);
  };

  // The context value that will be provided
  const contextValue = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    refreshToken,
    clearError,
    api
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;