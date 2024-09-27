import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import MenuApp from '../components/MenuApp';
import banner from "../assets/images/banner.jpg";

const Home = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // const bannerUrl = require('../assets/banner.jpg')

  useEffect(() => {
    // Fetch recommended products based on user behavior
    // This is a placeholder, replace with actual API call
    setRecommendedProducts([
      { id: 1, name: 'Product 1', image: 'product1.jpg' },
      { id: 2, name: 'Product 2', image: 'product2.jpg' },
      { id: 3, name: 'Product 3', image: 'product3.jpg' },
      { id: 4, name: 'Product 4', image: 'product4.jpg' },
    ]);

    // Fetch categories for "Explore Brand Series"
    // This is a placeholder, replace with actual API call
    setCategories([
      { id: 1, name: 'cat-furniture', image: 'category1.jpg' },
      { id: 2, name: 'cat-beds-mats', image: 'category2.jpg' },
      { id: 3, name: 'cat-bowls-food-feeders', image: 'category3.jpg' },
      { id: 4, name: 'cat-toys', image: 'category4.jpg' },
      { id: 5, name: 'cat-apparel-accessories', image: 'category5.jpg' },
      { id: 6, name: 'cat-carriers-travel', image: 'category6.jpg' },
      { id: 7, name: 'cat-litters-cleaning-tools', image: 'category7.jpg' },
      { id: 8, name: 'custom-cat-items', image: 'category8.jpg' },
    ]);
  }, []);

  return (
    <div className="pt-16"> {/* Add padding to prevent content from being hidden behind the NavBar */}
      <div className="relative isolate overflow-hidden bg-white px-6 lg:overflow-visible lg:px-0">
        <div className="h-[83.33vh] flex items-end relative inset-0 -z-10" style={{ backgroundImage: `url(${banner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="relative pb-16 z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl mb-4 text-white">Welcome to ZUO's Shop</h1>
            <p className="text-xl mb-4 text-white">Get your ZUO's merchandise here!</p>
            {user ? (
              <p className="text-xl mb-4">Welcome, {user.user_name}</p>
            ) : (
              <>
              </>
            )}
            <Link to="/shop" className="bg-transparent text-white py-1 border-b-2 border-white hover:border-gray-200 hover:text-gray-200">即刻探索</Link>
          </div>
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
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
          </svg>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="py-12">
        <h2 className="text-3xl mb-6 text-center">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
              <h3 className="mt-4 text-lg">{product.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Brand Series */}
      <div className="py-12 bg-gray-100">
        <h2 className="text-3xl mb-6 text-center">Explore Brand Series</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <div key={category.id} className="bg-white p-4 rounded shadow-md">
              <img src={category.image} alt={category.name} className="w-full h-48 object-cover rounded" />
              <h3 className="mt-4 text-lg">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Different Series Products */}
      <div className="py-12">
        <h2 className="text-3xl mb-6 text-center">Different Series Products</h2>
        {/* Add your series products here */}
      </div>

      {/* Help, Follow Us, etc. */}
      <div className="py-12 bg-gray-100">
        <h2 className="text-3xl mb-6 text-center">Help & Follow Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg">Help</h3>
            <p className="mt-2">Get help with your orders and more.</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg">Follow Us</h3>
            <p className="mt-2">Stay updated with our latest news.</p>
          </div>
          {/* Add more sections as needed */}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-gray-200 py-6 bg-white text-black text-center">
        <p>&copy; 2024 ZUO's Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
