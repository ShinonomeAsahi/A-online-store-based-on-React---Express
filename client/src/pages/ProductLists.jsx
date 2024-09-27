import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import ProductItem from '../components/ProductItem';
import CartApp from '../components/CartApp';
import { useAuth } from '../provider/AuthProvider';

const baseURL = 'http://localhost:3001/api';

export default function ProductLists() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const { token } = useAuth(); // Use token from AuthProvider
  const { product_category } = useParams();
  // 使用正则匹配图片URL
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  console.log('token:', token); // Log the token immediately after retrieving it

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}/products`);
        const filteredProducts = product_category 
          ? response.data.filter(product => product.product_category === product_category)
          : response.data; // If category is null, show all products
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [product_category]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product._id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const onItemClick = (product) => {
    setSelectedProduct(product);
  };

  // 计算购物车商品种数
  const cartItemCount = cart.reduce((total, item) => total + 1, 0);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
      {/* <h1>{product_category ? `in ${product_category.replace('-', ' ')}` : ''}</h1> */}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.product_img_url.match(urlPattern)[0]}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 cursor-pointer"
                  onClick={() => onItemClick(product)}
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.product_name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${product.product_price}</p>
            </div>
          ))}
        </div>
        <div className="fixed bottom-8 right-8">
          <button
            type="button"
            className="relative rounded-full p-1 text-gray-600 hover:text-gray-900 border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setOpen(true)}
          >
            {cartItemCount > 0 && <div className='box-border text-center left-4 -top-1 z-10 absolute w-5 h-5 rounded-full bg-red-700 text-white text-base'>
                <span className="inline-block text-white relative bottom-0.5">{cartItemCount}</span>
            </div>}
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View cart</span>
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      {selectedProduct && (
        <ProductItem 
          product={selectedProduct} 
          onAddToCart={addToCart} 
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <CartApp cart={cart} setCart={setCart} open={open} setOpen={setOpen} />
    </div>
  );
}
