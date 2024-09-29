// SearchBar.jsx
import React from 'react';

const SearchBar = () => {
  return (
<div className="mb-4"> {/* 增加底部的留白 */}
  <div className="flex items-center bg-gray-600 border border-gray-300 rounded-md shadow-md p-2">
    <input
      type="text"
      placeholder="搜索..."
      className="bg-transparent outline-none px-2 py-1 w-full text-sm text-white" // 输入文字为白色
    />
    <button className="bg-black text-white rounded-md p-1 hover:bg-gray-800 transition duration-200 text-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white" // 白色图标
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l7 7"
        />
      </svg>
    </button>
  </div>
</div>


  );
};

export default SearchBar;
