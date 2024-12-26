import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import CartSlide from './components/CartSlide'; 

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <CartSlide /> 
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            {/* Dynamic Route for Categories */}
            <Route
              path="/products/:category"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            {/* Not Found for Invalid Categories */}
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;

