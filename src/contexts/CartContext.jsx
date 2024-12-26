// // src/contexts/CartContext.jsx
// import React, { createContext, useState, useEffect } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
//   const [cart, setCart] = useState(initialCart);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find(item => item.id === product.id);
//       if (existing) {
//         return prev.map(item =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart(prev => prev.filter(item => item.id !== id));
//   };

//   const increaseQuantity = (id) => {
//     setCart(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQuantity = (id) => {
//     setCart(prev =>
//       prev.map(item =>
//         item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
//       )
//     );
//   };

//   const toggleCart = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

//   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         toggleCart,
//         isCartOpen,
//         totalItems,
//         totalPrice,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, setCart] = useState(initialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        toggleCart,
        isCartOpen,
        totalItems,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


