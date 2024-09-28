import React from 'react';  
  
function Header() {  
  return (  
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm w-full p-3">  
      {/* 这里可以添加你的header内容，比如导航链接、logo等 */}  
      <div className="container mx-auto flex justify-between items-center">  
        <div>  
          {/* Logo或者标题 */}  
          <h1 className="text-xl font-bold">My Website</h1>  
        </div>  
        <div>  
          {/* 导航链接，这里仅作为示例 */}  
          <nav className="space-x-4">  
            <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>  
            <a href="/about" className="text-gray-700 hover:text-gray-900">About</a>  
            <a href="/services" className="text-gray-700 hover:text-gray-900">Services</a>  
            <a href="/contact" className="text-gray-700 hover:text-gray-900">Contact</a>  
          </nav>  
        </div>  
      </div>  
    </header>  
  );  
}  
  
export default Header;