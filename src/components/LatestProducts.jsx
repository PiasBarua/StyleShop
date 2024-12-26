// // src/components/LatestProducts.jsx
// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { CartContext } from '../contexts/CartContext';

// const LatestProducts = () => {
//   const [products, setProducts] = useState([]);
//   const { addToCart } = useContext(CartContext);

//   useEffect(() => {
//     axios
//       .get('https://fakestoreapi.com/products?limit=6')
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <section className="bg-white py-12">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
//           Our Latest Products
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {products.map((prod) => (
//             <div
//               key={prod.id}
//               className="border rounded-lg p-6 flex flex-col items-center shadow-md hover:shadow-lg transition"
//             >
//               <img
//                 src={prod.image}
//                 alt={prod.title}
//                 className="w-40 h-40 object-contain mb-4"
//               />
//               <h3 className="text-lg font-medium text-gray-700 text-center mb-2">
//                 {prod.title}
//               </h3>
//               <p className="text-xl font-bold text-green-600 mb-4">
//                 ${prod.price}
//               </p>
//               <button
//                 onClick={() => addToCart(prod)}
//                 className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LatestProducts;


import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';
import { FaSearch, FaTimes } from 'react-icons/fa';
import debounce from 'lodash.debounce'; // Ensure lodash.debounce is installed

const LatestProducts = () => {
  const [products, setProducts] = useState([]); // All products
  const [displayedProducts, setDisplayedProducts] = useState([]); // Products to display
  const [searchTerm, setSearchTerm] = useState(''); // Search input
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error state

  useEffect(() => {
    // Fetch all products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products'); // Fetch all products
        setProducts(response.data);
        setDisplayedProducts(response.data.slice(0, 6)); // Show first 6 by default
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Memoize the debounced filter function
  const debouncedFilter = useCallback(
    debounce((query) => {
      if (query.trim() === '') {
        setDisplayedProducts(products.slice(0, 8)); // Reset to first 6
      } else {
        const filtered = products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setDisplayedProducts(filtered);
      }
    }, 300), // 300ms delay
    [products]
  );

  useEffect(() => {
    debouncedFilter(searchTerm);

    // Cleanup debounce on unmount
    return () => {
      debouncedFilter.cancel();
    };
  }, [searchTerm, debouncedFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Loader Styles: Ensure these are defined in your CSS */}
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
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Flex Container for Search Bar and Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-emerald-500 font-Lobster">
            Our Latest Products
          </h2>
          {/* Search Bar */}
          <div className="relative w-full max-w-md mb-4 md:mb-0 ">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2 border border-emerald-500 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
            <FaSearch className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500" />
          </div>

          {/* Header */}
          
        </div>

        {/* Products Grid */}
        {displayedProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedProducts.map((prod) => (
              <div
                key={prod.id}
                className="border rounded-lg p-6 flex flex-col items-center shadow-md hover:shadow-lg transition"
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-40 h-40 object-contain mb-4"
                  loading="lazy" // Lazy loading for performance
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

export default LatestProducts;

