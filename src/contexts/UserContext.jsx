// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));

  useEffect(() => {
    const handleStorageChange = () => {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      setUser(loggedUser);
    };

    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (userData) => {
    localStorage.setItem('loggedUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
