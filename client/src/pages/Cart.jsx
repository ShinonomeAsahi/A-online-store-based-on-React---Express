import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/cart', {
          params: { userId: 1 }  // Example userId, replace with actual logged in user id
        });
        setCartItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post('http://localhost:3001/api/cart/remove', {
        userId: 1,  // Example userId, replace with actual logged in user id
        productId
      });
      setCartItems(cartItems.filter(item => item._id !== productId));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/orders/checkout', {
        userId: 1,  // Example userId, replace with actual logged in user id
        items: cartItems
      });
      console.log(response.data);
      setCartItems([]); // Clear cart after checkout
    } catch (error) {
      console.error(error);
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
        <h2 className="text-2xl mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map(item => (
              <div key={item._id} className="bg-white p-4 rounded shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-xl mb-2">{item.product_name}</h3>
                  <p className="text-lg font-bold mb-2">${item.product_price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="text-right">
              <button
                onClick={handleCheckout}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
