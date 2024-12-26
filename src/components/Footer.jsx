// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-emerald-500 text-gray-200 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} StyleShop. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/products/all" className="hover:text-white transition">
            Products
          </Link>
          <Link to="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
