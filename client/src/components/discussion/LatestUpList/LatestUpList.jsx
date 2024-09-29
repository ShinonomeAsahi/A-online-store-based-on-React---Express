// MiniList.jsx
import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';

const MiniList = ({newUsers: initialUsers }) => {
  const [newUsers, setNewUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialUsers && initialUsers.length > 0) {
      setNewUsers(initialUsers);
      setIsLoading(false);
    }
  }, [initialUsers]);

  if (isLoading) {
    // return <div>Loading...</div>; // 或者使用一个加载动画组件
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <h2 className="text-base font-bold p-4 border-b">Latest Startups</h2>
      {newUsers.map(user => (
        <ListItem key={user._id} author={user} />
      ))}
    </div>
  );
};

export default MiniList;
