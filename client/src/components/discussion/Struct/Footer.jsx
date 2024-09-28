// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-blue-400">隐私政策</a>
          <a href="#" className="hover:text-blue-400">服务条款</a>
          <a href="#" className="hover:text-blue-400">联系我们</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
