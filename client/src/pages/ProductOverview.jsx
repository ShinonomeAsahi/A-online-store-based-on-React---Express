// ProductOverview.js
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'

const baseURL = 'http://localhost:3001/api/products';

export default function ProductOverview({ onAddToCart }) {
  
    const { product_id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedSize, setSelectedSize] = useState("S")
    // 使用正则匹配图片URL
    const urlPattern = /(https?:\/\/[^\s\)]+jpg)/g;
    const color = ['Red', 'Blue', 'Green']
    const sizes = [
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: false }
    ];
  
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`${baseURL}/getProductById`, {
            params: { product_id: product_id }
          });
          setProduct(response.data);
        } catch (error) {
          // Handle error
          console.error('Error fetching product', error);
        }
      };
      fetchProduct();
    }, [product_id]);
  
    const reviews = { href: '#', average: 4, totalCount: 117 };
  
  
    return (
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          {product && (
            <div className="mx-auto mt-6 max-w-2xl pt-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.product_img_url.match(urlPattern)[0]}
                alt={product.product_name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.product_img_url.match(urlPattern)[1]}
                  alt={product.product_name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.product_img_url.match(urlPattern)[2]}
                  alt={product.product_name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.product_img_url.match(urlPattern)[0]}
                alt={product.product_name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          )}
  
          {/* Product info */}
          {product && (
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.product_name}</h1>
            </div>
  
            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{product.product_price}</p>
  
              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.product_rating > rating ? 'text-gray-900' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.product_rating} out of 5 stars</p>
                  <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>
  
              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
  
                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                      {color.map((color) => (
                        <Radio
                          key={color}
                          value={color}
                          className={({ focus, checked }) =>
                            classNames(
                              color.selectedClass,
                              focus && checked ? 'ring ring-offset-1' : '',
                              !focus && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              'h-8 w-8 rounded-full border border-black border-opacity-10'
                            )}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
  
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a href="www.google.com" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>
  
                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {sizes.map((size) => (
                        <Radio
                          key={size}
                          value={size}
                          className={({ focus }) =>
                            classNames(
                              size.inStock
                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              focus ? 'ring-2 ring-indigo-500' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ checked, focus }) => (
                            <>
                              <span>{size.name}</span>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    focus ? 'border' : 'border-2',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
  
                <button
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>
  
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
  
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.product_name}</p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
  
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.product_description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  
}
