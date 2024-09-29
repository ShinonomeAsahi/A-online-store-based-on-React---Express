import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider";
import SearchApp from "./SearchApp";
import MenuApp from "./MenuApp";

const categories = [
  "cat-furniture",
  "cat-beds-mats",
  "cat-bowls-food-feeders",
  "cat-toys",
  "cat-apparel-accessories",
  "cat-carriers-travel",
  "cat-litters-cleaning-tools",
  "custom-cat-items",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const { token, user, setToken } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [location, token]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/logout");
      setToken(null);
      localStorage.removeItem("username");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Disclosure as="nav" className="bg-white border-b-2 border-gray-200">
      {({ open }) => (
        <>
          <div className="fixed top-0 left-0 min-h-20 w-full border-b-2 border-gray-200 bg-white shadow-md z-50 mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center min-w-52 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center min-w-52 justify-center sm:items-stretch sm:justify-start">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-900 hover:text-gray-700"
                >
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">

                    {/* Shop下拉菜单 */}
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button className="relative flex border-b-2 border-black text-black hover:text-gray-700 text-sm">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View shop</span>
                          Shop ᐯ
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-500"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-200"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-auto z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {categories.map((category) => (
                            <Menu.Item key={category}>
                              {({ active }) => (
                                <Link
                                  to={`/shop/${category}`}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {category.replace(/-/g, " ")}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <div>
                      <button className="relative flex border-b-2 border-black text-black hover:text-gray-700 text-sm">
                          <Link to="/discussion">Community</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            {/* 导航栏中部品牌名称 */}
              <div className="flex items-center justify-center">
                <h1 className="text-4xl font-light font-sans md:font-serif">ZUO LAND</h1>
              </div>

              {/* 导航栏右侧小组件 */}
              <div className="absolute inset-y-0 right-0 flex justify-end items-center min-w-52 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
                {/* 搜索按钮 */}
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-black"
                  onClick={openSearch}
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* 通知按钮 */}
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-black"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* 用户头像及下拉菜单 */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 object-scale-down rounded-full"
                        src={require("../assets/images/zuo2.jpg")}
                        alt="userAvatar"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-500"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/settings"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={
                              isLoggedIn
                                ? handleLogout
                                : () => navigate("/login")
                            }
                          >
                            {isLoggedIn ? "Logout" : "Login"}
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <SearchApp isSearchOpen={isSearchOpen} closeSearch={closeSearch} />
          <MenuApp
            isMenuOpen={isMenuOpen}
            closeMenu={() => setIsMenuOpen(false)}
          />
        </>
      )}
    </Disclosure>
  );
}
