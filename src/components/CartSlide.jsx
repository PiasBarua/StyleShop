// src/components/CartSlide.jsx
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const CartSlide = () => {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    clearCart,
  } = useContext(CartContext);

  const slideVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 flex flex-col"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={slideVariants}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="text-gray-700 hover:text-gray-900 transition"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mb-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="text-lg font-medium text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-green-600 font-semibold">
                      ${item.price}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 transition"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-semibold text-green-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                className="w-full mb-2 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-900 transition"
                onClick={() => {
                  // Implement checkout functionality
                  alert('Proceeding to checkout...');
                }}
              >
                Checkout
              </button>
              <button
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSlide;

