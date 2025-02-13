import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, removeToken } from '../utils/auth';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            setIsAuthenticated(true);
            // Get role from localStorage
            const role = localStorage.getItem('role');
            setUserRole(role);
          } else {
            removeToken();
            setIsAuthenticated(false);
            setUserRole(null);
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          removeToken();
          setIsAuthenticated(false);
          setUserRole(null);
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const login = (token, role) => {
    saveToken(token);
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('role', role);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('role');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008069]"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};