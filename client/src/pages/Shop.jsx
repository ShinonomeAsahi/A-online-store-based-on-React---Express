import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../provider/AuthProvider';

const Shop = () => {
  const { token } = useAuth(); // Use token from AuthProvider
  console.log('token:', token); // Log the token immediately after retrieving it
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('useEffect triggered'); // Debugging: Log when useEffect is triggered
    const fetchProducts = async () => {
      try {
        console.log('Token inside fetchProducts:', token); // Debugging: Log the token inside fetchProducts
        if (!token) {
          console.error('No token found in AuthProvider');
          return;
        }
        const headers = {
          'Authorization': `Bearer ${token}` // Add JWT token to request headers
        };
        console.log('Request Headers:', headers); // Debugging: Log the request headers
        const response = await axios.get('http://localhost:3001/api/products', { headers });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
      }
    };

    fetchProducts();
  }, [token]);

  const addToCart = async (productId) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}` // Add JWT token to request headers
      };
      console.log('Request Headers:', headers); // Debugging: Log the request headers
      const response = await axios.post('http://localhost:3001/api/userCarts/addToCart', {
        userId: 1,  // Example userId, replace with actual logged in user id
        productId,
        quantity: 1
      }, { headers });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-4">Shop</h1>
        <div className="grid grid-cols-1 gap-6">
          {products.map(product => (
            <div key={product.product_id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl mb-2">{product.product_name}</h3>
              <p className="text-lg font-bold mb-2">${product.product_price}</p>
              <button
                onClick={() => addToCart(product.product_id)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
