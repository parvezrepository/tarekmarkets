import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem('admin_session');
    const savedToken = localStorage.getItem('admin_token');
    return savedAdmin && savedToken ? JSON.parse(savedAdmin) : null;
  });

  const login = async (email, password) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAdmin(data.admin);
        localStorage.setItem('admin_session', JSON.stringify(data.admin));
        localStorage.setItem('admin_token', data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      return { success: false, message: 'Server error connection' };
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_token');
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('admin_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
