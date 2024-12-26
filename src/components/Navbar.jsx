// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  const { totalItems, toggleCart } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-emerald-500 font-Lobster">
        StyleShop
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-emerald-500">Hello, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-900 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-900 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-900 transition"
              >
                Register
              </Link>
            </>
          )}
          <button
            className="relative text-2xl text-gray-800 hover:text-gray-600 transition"
            onClick={toggleCart}
          >
            <FaShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
