// src/components/Categories.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-semibold text-center text-emerald-500 mb-8 font-Lobster">
        Product Categories
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className="px-6 py-4 bg-emerald-500 text-white rounded-full hover:bg-emerald-900 transition"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
