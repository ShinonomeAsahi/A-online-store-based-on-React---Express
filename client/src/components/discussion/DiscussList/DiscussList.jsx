// MiniList.jsx
import React from 'react';
import ListItem from './ListItem';

const discussions = [
  {
    author: { name: 'Alice', icon: 'https://via.placeholder.com/32' },
    title: 'How to improve your coding skills?',
    date: '2024-09-25',
    commentsCount: 5,
  },
  {
    author: { name: 'Bob', icon: 'https://via.placeholder.com/32' },
    title: 'Understanding React hooks',
    date: '2024-09-24',
    commentsCount: 3,
  },
  {
    author: { name: 'Charlie', icon: 'https://via.placeholder.com/32' },
    title: 'Tailwind CSS tips and tricks',
    date: '2024-09-23',
    commentsCount: 7,
  },
];

const MiniList = ({title}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <h2 className="text-base font-bold p-4 border-b">{title}</h2>
      {discussions.map((discussion, index) => (
        <ListItem
          key={index}
          author={discussion.author}
          title={discussion.title}
          date={discussion.date}
          commentsCount={discussion.commentsCount}
        />
      ))}
    </div>
  );
};

export default MiniList;
