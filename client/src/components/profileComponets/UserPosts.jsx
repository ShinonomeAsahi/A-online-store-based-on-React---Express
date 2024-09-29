import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../provider/AuthProvider';

export default function UserPosts({ userId, type }) {
  const [posts, setPosts] = useState([]);
  const { token, user_id } = useAuth();

  const fetchPosts = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get(`http://localhost:3001/api/discussions/getDiscussionByUserId?user_id=${user_id}`, { headers });
      setPosts(response.data);
    } catch (error) {
      console.error(`Failed to fetch user ${type}:`, error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      {posts.map(post => (
        <div key={post._id} className="p-4 border-b last:border-b-0">
          <h3 className="font-bold text-lg mb-2">{post.discussion_title}</h3>
          <p className="text-gray-600">{new Date(post.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}