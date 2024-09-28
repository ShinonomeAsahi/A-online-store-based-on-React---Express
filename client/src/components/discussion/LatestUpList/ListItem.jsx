// ListItem.jsx
import React from 'react';

const ListItem = ({ author }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        <img
          src={author.icon}
          alt={author.name}
          className="w-8 h-8 rounded-full mr-3"
        />
        <span className="font-bold text-gray-800">{author.name}</span>
      </div>
      <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition">
        Follow
      </button>
    </div>
  );
};

export default ListItem;
