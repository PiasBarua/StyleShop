// src/components/Newsletter.jsx
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate subscription
    setMessage('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest products and offers.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-1/3 px-4 py-2 border border-emerald-400 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-900 transition"
          >
            Subscribe
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
