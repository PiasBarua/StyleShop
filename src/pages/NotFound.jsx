// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h2 className="text-4xl font-semibold text-gray-800 mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
