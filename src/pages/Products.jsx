// src/pages/Products.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [validCategory, setValidCategory] = useState(true);
  const [allCategories, setAllCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/products/categories');
      setAllCategories(res.data);
      if (category.toLowerCase() !== 'all' && !res.data.includes(category)) {
        setValidCategory(false);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const fetchProducts = async (cat) => {
    setLoading(true);
    setError(false);
    try {
      let url = 'https://fakestoreapi.com/products';
      if (cat && cat.toLowerCase() !== 'all') {
        url = `https://fakestoreapi.com/products/category/${cat}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  if (!validCategory) {
    return <Navigate to="/notfound" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Failed to load products.
        </h2>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="bg-white py-12 mt-14">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          {category.charAt(0).toUpperCase() + category.slice(1)} Products
        </h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="border rounded-lg p-6 flex flex-col items-center shadow-md hover:shadow-lg transition"
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-40 h-40 object-contain mb-4"
                />
                <h3 className="text-lg font-medium text-gray-700 text-center mb-2">
                  {prod.title}
                </h3>
                <p className="text-xl font-bold text-green-600 mb-4">
                  ${prod.price}
                </p>
                <button
                  onClick={() => addToCart(prod)}
                  className="mt-auto px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-900 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
