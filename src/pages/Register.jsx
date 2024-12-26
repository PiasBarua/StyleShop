// // src/pages/Register.jsx
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../contexts/UserContext';

// const Register = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(UserContext);
//   const [user, setUser] = useState({ name: '', email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const users = JSON.parse(localStorage.getItem('users')) || [];

//     // Check if email already exists
//     const exists = users.find((u) => u.email === user.email);
//     if (exists) {
//       setError('Email already registered.');
//       return;
//     }

//     users.push(user);
//     localStorage.setItem('users', JSON.stringify(users));
//     login(user);
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           Register
//         </h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={user.name}
//             required
//             onChange={handleChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={user.email}
//             required
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={user.password}
//             required
//             onChange={handleChange}
//           />
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//           >
//             Register
//           </button>
//         </form>
//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{' '}
//           <span
//             onClick={() => navigate('/login')}
//             className="text-blue-500 cursor-pointer hover:underline"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
// src/pages/Register.jsx
// src/pages/Register.jsx
// src/pages/Register.jsx

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import registerImage from "../assets/images/RegistrationSideImage.png"; // Ensure this path is correct

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Moderate";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const exists = users.find((u) => u.email === user.email);
    if (exists) {
      setError("Email already registered.");
      return;
    }

    // Check if passwords match
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Remove confirmPassword before storing
    const { confirmPassword, ...newUser } = user;

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    login(newUser);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="lg:flex">
          {/* Image Section */}
          <div className="hidden lg:flex lg:w-1/2">
            <img
              className="w-full h-full object-cover"
              src={registerImage}
              alt="Register Illustration"
            />
          </div>
          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-8">
            <h2 className="text-3xl font-semibold text-emerald-500 text-center mb-6 font-Lobster">
              Create an Account
            </h2>
            {error && (
              <div className="mb-4 text-red-500 text-center">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name Here"
                  value={user.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  value={user.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  value={user.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {/* Password Strength Indicator */}
                {user.password && (
                  <div className="mt-2">
                    <span>Password Strength: </span>
                    <span className="font-medium">
                      {calculatePasswordStrength(user.password)}
                    </span>
                  </div>
                )}
              </div>
              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="********"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-emerald-500 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Register
                </button>
              </div>
            </form>
            {/* Divider */}
            <div className="mt-6 flex items-center justify-center">
              <span className="border-t border-gray-300 w-full"></span>
              <span className="mx-2 text-gray-500">OR</span>
              <span className="border-t border-gray-300 w-full"></span>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-green-600 hover:text-green-500 font-medium"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
