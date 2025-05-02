import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the Auth Context
const AuthContext = createContext(null);

// Base API URL
const API_URL = 'http://localhost:8000/api/v1';

// Create the Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tokens, setTokens] = useState({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null
  });

  // Initialize auth state on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        
        // Check if we have tokens in localStorage
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        
        if (storedAccessToken && storedRefreshToken) {
          // Update tokens state
          setTokens({
            accessToken: storedAccessToken,
            refreshToken: storedRefreshToken
          });
          
          // Attempt to get user profile with the tokens
          await getUserProfile();
        } else {
          // Try to refresh using HTTP cookies as fallback
          await refreshToken();
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Auth check failed:", err);
        // Clear any invalid tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setTokens({ accessToken: null, refreshToken: null });
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Update authorization header whenever tokens change
  useEffect(() => {
    if (tokens.accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [tokens.accessToken]);

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

  // Save tokens to local storage
  const saveTokens = (accessToken, refreshToken) => {
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    
    setTokens({
      accessToken: accessToken || tokens.accessToken,
      refreshToken: refreshToken || tokens.refreshToken
    });
  };

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
      
      // Save received user data
      setUser(response.data.data.user);
      
      // Save tokens both in state and localStorage
      const { accessToken, refreshToken } = response.data.data;
      saveTokens(accessToken, refreshToken);
      
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
      // Include stored refresh token in request if available
      const storedRefreshToken = localStorage.getItem('refreshToken');
      
      const response = await api.post('/users/refresh-token', {
        refreshToken: storedRefreshToken
      });
      
      if (response.data?.data?.user) {
        setUser(response.data.data.user);
      }
      
      // Save new tokens
      if (response.data?.data?.accessToken && response.data?.data?.refreshToken) {
        saveTokens(response.data.data.accessToken, response.data.data.refreshToken);
      }
      
      return response.data;
    } catch (err) {
      // Clear user and tokens on refresh failure
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setTokens({ accessToken: null, refreshToken: null });
      throw err;
    }
  };

  // Get user profile
  const getUserProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setUser(response.data.data.user);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      throw err;
    }
  };

  // User logout
  const logout = async () => {
    try {
      setLoading(true);
      
      // Call logout API
      await api.post('/users/logout');
      
      // Clear user state and tokens
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setTokens({ accessToken: null, refreshToken: null });
      
      setLoading(false);
    } catch (err) {
      console.error("Logout error:", err);
      
      // Even if API fails, clear local state
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setTokens({ accessToken: null, refreshToken: null });
      
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
    tokens,
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