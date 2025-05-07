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

  // Axios instance with credentials
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // Set token in axios header whenever it changes
  useEffect(() => {
    if (tokens.accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [tokens.accessToken]);

  // Get authorization header - NEW UTILITY FUNCTION
  const getAuthHeader = () => {
    return tokens.accessToken ? { 'Authorization': `Bearer ${tokens.accessToken}` } : {};
  };

  // Save tokens to local storage
  const saveTokens = (accessToken, refreshToken) => {
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    
    setTokens({
      accessToken: accessToken || tokens.accessToken,
      refreshToken: refreshToken || tokens.refreshToken
    });
  };

  // Get user profile
  const getUserProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setUser(response.data.data);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      throw err;
    }
  };

  // Refresh token
  const refreshToken = async () => {
    try {
      // Include stored refresh token in request if available
      const storedRefreshToken = localStorage.getItem('refreshToken');
      
      if (!storedRefreshToken) {
        throw new Error("No refresh token available");
      }
      
      const response = await api.post('/users/refresh-token', {
        refreshToken: storedRefreshToken
      });
      
      if (response.data?.data?.user) {
        setUser(response.data.data.user);
      }
      
      // Save new tokens
      if (response.data?.data?.accessToken && response.data?.data?.refreshToken) {
        saveTokens(response.data.data.accessToken, response.data.data.refreshToken);
        return response.data;
      } else {
        throw new Error("No tokens received from server");
      }
    } catch (err) {
      // Clear user and tokens on refresh failure
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setTokens({ accessToken: null, refreshToken: null });
      throw err;
    }
  };

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
          const refreshData = await refreshToken();
          // If refresh successful, retry the original request
          if (refreshData?.data?.accessToken) {
            originalRequest.headers['Authorization'] = `Bearer ${refreshData.data.accessToken}`;
            return api(originalRequest);
          }
          return Promise.reject(error);
        } catch (refreshError) {
          // If refresh fails, log out
          await logout();
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );

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
          
          // Set the authorization header before attempting the profile request
          api.defaults.headers.common['Authorization'] = `Bearer ${storedAccessToken}`;
          
          // Attempt to get user profile with the tokens
          try {
            await getUserProfile();
          } catch (profileError) {
            // If profile fetch fails, try to refresh the token
            if (profileError.response?.status === 401) {
              await refreshToken();
            } else {
              throw profileError;
            }
          }
        } else {
          // No tokens in localStorage, try cookies as fallback
          try {
            await refreshToken();
          } catch (refreshError) {
            // No valid authentication, remain logged out
            console.log("No valid authentication found");
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        // Clear any invalid tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setTokens({ accessToken: null, refreshToken: null });
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // User registration
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/users/register', userData);
      
      if (response.data?.data) {
        setUser(response.data.data);
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
      if (response.data?.data?.user) {
        setUser(response.data.data.user);
      }
      
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

  // User logout
  const logout = async () => {
    try {
      setLoading(true);
      
      // Only call logout API if we have an accessToken
      if (tokens.accessToken) {
        try {
          await api.post('/users/logout');
        } catch (apiError) {
          console.error("Logout API error:", apiError);
          // Continue with local logout even if API fails
        }
      }
      
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
    token: tokens.accessToken, // ADDED: Direct token access
    tokens,
    register,
    login,
    getUserProfile,
    logout,
    refreshToken,
    clearError,
    getAuthHeader, // ADDED: Utility function for auth headers
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