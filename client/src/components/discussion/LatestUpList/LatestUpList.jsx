// MiniList.jsx
import React from 'react';
import ListItem from './ListItem';

const authors = [
  { name: 'Alice', icon: 'https://via.placeholder.com/40' },
  { name: 'Bob', icon: 'https://via.placeholder.com/40' },
  { name: 'Charlie', icon: 'https://via.placeholder.com/40' },
];

const MiniList = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <h2 className="text-base font-bold p-4 border-b">Latest Startups</h2>
      {authors.map((author, index) => (
        <ListItem key={index} author={author} />
      ))}
    </div>
  );
};

export default MiniList;
