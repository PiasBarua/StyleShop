// src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Import your banner images
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.jpg';
import banner3 from '../assets/images/banner3.jpg';

const banners = [banner1, banner2, banner3];

const Header = () => {
  const [current, setCurrent] = useState(0);
  const length = banners.length;

  // Automatic Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000); // Slide changes every 5 seconds

    return () => clearInterval(interval);
  }, [length]);

  // Manual Slide Controls
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Handle keyboard navigation (optional)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, length]);

  if (!Array.isArray(banners) || banners.length === 0) {
    return null;
  }

  return (
    <header className="relative mt-16 w-full h-96 md:h-[850px] overflow-hidden rounded-lg shadow-lg">
      {/* Slider Container */}
      <AnimatePresence>
        <motion.img
          key={current}
          src={banners[current]}
          alt={`Banner ${current + 1}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay Content (Optional) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-30">
        <h2 className="text-4xl font-bold font-Lobster ">Welcome to StyleShop</h2>
        <p className="mt-2 text-lg">Discover our exclusive collection.</p>
        <button className="mt-4 px-6 py-2 bg-emerald-500 rounded hover:bg-emerald-900 transition">
          Shop Now
        </button>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-emerald-500 bg-opacity-70 text-gray-800 p-3 rounded-full hover:bg-opacity-90 transition shadow-lg focus:outline-none"
        aria-label="Previous Slide"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-emerald-500 bg-opacity-70 text-gray-800 p-3 rounded-full hover:bg-opacity-90 transition shadow-lg focus:outline-none"
        aria-label="Next Slide"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full focus:outline-none transition ${
              current === index ? 'bg-emerald-500' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </header>
  );
};

export default Header;
