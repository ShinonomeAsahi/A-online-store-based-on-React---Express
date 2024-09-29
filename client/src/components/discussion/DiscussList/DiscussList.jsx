import React, { useState, useEffect } from 'react';
import ListItem from './ListItem'; // 假设 ListItem 组件在这个路径

const MiniList = ({ title, newDiscussions: initialDiscussions }) => {
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialDiscussions && initialDiscussions.length > 0) {
      setDiscussions(initialDiscussions);
      setIsLoading(false);
    }
  }, [initialDiscussions]);

  if (isLoading) {
    // return <div>Loading...</div>; // 或者使用一个加载动画组件
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <h2 className="text-base font-bold p-4 border-b">{title}</h2>
      {discussions.map(item => (
        <ListItem
          key={item._id}
          author={item.created_by.user_name}
          title={item.discussion_title}
          date={item.createdAt}
          commentsCount={6}
        />
      ))}
    </div>
  );
};

export default MiniList;