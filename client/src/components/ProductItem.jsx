import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
// import ProductOverview from '../pages/ProductOverview';

export default function ProductItem({ product, onAddToCart, onClose }) {
  // 设置 open 状态，初始值为 true
  const [open, setOpen] = useState(true);

  // 设置 open 状态，当 product 变化时触发
  useEffect(() => {
    setOpen(true);
  }, [product]);

  // 添加商品到购物车
  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity: 1 });
    handleClose();
  };

  // 关闭对话框
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  // 使用正则匹配图片URL
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  // 返回 Transition 组件，设置 show 为 open，当 open 为 true
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="flex-none w-60 relative">
                  <img src={product.product_img_url.match(urlPattern)[0]} alt={product.imageAlt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 pb-6 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 "
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <form class="flex-auto p-6">
                  <div class="flex flex-wrap">
                    <h1 class="flex-auto text-lg font-semibold text-slate-900">
                      {product.product_name}
                    </h1>
                    <div class="text-lg font-semibold pr-8 text-slate-500">
                      ${product.product_price}
                    </div>
                    <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                      In stock: {product.product_stock}
                    </div>
                  </div>
                  <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                    <div class="space-x-2 flex text-sm">
                      <label>
                        <input class="sr-only peer" name="size" type="radio" value="xs" checked />
                        <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                          XS
                        </div>
                      </label>
                      <label>
                        <input class="sr-only peer" name="size" type="radio" value="s" />
                        <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                          S
                        </div>
                      </label>
                      <label>
                        <input class="sr-only peer" name="size" type="radio" value="m" />
                        <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                          M
                        </div>
                      </label>
                      <label>
                        <input class="sr-only peer" name="size" type="radio" value="l" />
                        <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                          L
                        </div>
                      </label>
                      <label>
                        <input class="sr-only peer" name="size" type="radio" value="xl" />
                        <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                          XL
                        </div>
                      </label>
                    </div>
                  </div>
                  <div class="flex space-x-4 mb-2 text-sm font-medium">
                    <div class="flex-auto flex space-x-4">
                      {/* 此处考虑使用Url重写提高可读性 */}
                      <Link to={`/product/${product._id}`}>
                        <button class="h-10 px-10 font-semibold rounded-md border border-slate-200 text-slate-900" 
                        type="button"
                        >
                          Overview
                        </button>
                      </Link>
                      <button class="h-10 px-10 font-semibold rounded-md border border-slate-200 text-slate-900" 
                      type="button"
                      onClick={handleAddToCart}
                      >
                        Add To Cart
                      </button>
                    </div>
                    <button class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
                      <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
