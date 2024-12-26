// src/components/ProtectedRoute.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Simulate checking authentication
    const timeout = setTimeout(() => {
      setChecking(false);
    }, 500); // Adjust as needed

    return () => clearTimeout(timeout);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
