import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../provider/AuthProvider';

export default function UserPosts({ userId, type }) {
  const [posts, setPosts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, [userId, type]);

  const fetchPosts = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get(`http://localhost:3001/api/users/${userId}/${type}`, { headers });
      setPosts(response.data.posts);
    } catch (error) {
      console.error(`Failed to fetch user ${type}:`, error);
    }
  };

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="mb-4 p-4 border rounded">
          <h3 className="font-bold">{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}