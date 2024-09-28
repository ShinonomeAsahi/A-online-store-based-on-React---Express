// SearchBar.jsx
import React from 'react';

const SearchBar = () => {
  return (
    <div className="mb-4"> {/* 增加底部的留白 */}
      <div className="flex items-center bg-gray-100 rounded-full shadow-md p-0.5">
        <input
          type="text"
          placeholder="搜索..."
          className="bg-transparent outline-none px-1 py-0.5 w-full text-sm"
        />
        <button className="bg-blue-500 text-white rounded-full p-0.5 hover:bg-blue-600 transition duration-200 text-sm">
          🔍
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
