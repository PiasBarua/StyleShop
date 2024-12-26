// src/components/BannerList.jsx

import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce'; // Ensure lodash.debounce is installed
import banner1 from '../assets/images/banner5.jpg';
import banner2 from '../assets/images/banner5.jpg';
import banner3 from '../assets/images/banner5.jpg';

const banners = [
  {
    id: 1,
    image: banner1,
    title: 'All Electronic Product Here',
    subtitle: 'Discover amazing products',
  },
  {
    id: 2,
    image: banner2,
    title: 'Summer Collection',
    subtitle: 'Trendy and comfortable',
  },
  {
    id: 3,
    image: banner3,
    title: 'Exclusive Deals',
    subtitle: 'Limited time offers',
  },
];

const BannerList = () => {
  const [current, setCurrent] = useState(0);
  const length = banners.length;

  // Memoize the debounced setCurrent function to prevent unnecessary re-creations
  const debouncedSetCurrent = useCallback(
    debounce((nextIndex) => {
      setCurrent(nextIndex);
    }, 500), // 500ms delay; adjust as needed
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = current === length - 1 ? 0 : current + 1;
      debouncedSetCurrent(nextIndex);
    }, 5000); // Change slide every 5000ms (5 seconds)

    return () => {
      clearInterval(interval);
      debouncedSetCurrent.cancel();
    };
  }, [current, length, debouncedSetCurrent]);

  if (!Array.isArray(banners) || banners.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full h-96 md:h-[600px] overflow-hidden font-Lobster">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {banner.title}
            </h2>
            <p className="text-lg md:text-2xl">{banner.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BannerList;
