import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../provider/AuthProvider';

export default function UserPosts({ userId, type }) {
  const [comment, setComment] = useState([]);
  const { token, user_id } = useAuth();

  const fetchComment = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get(`http://localhost:3001/api/discussions/getCommentByUserId?user_id=${user_id}`, { headers });
      setComment(response.data);
    } catch (error) {
      console.error(`Failed to fetch user ${type}:`, error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      {comment.map(item => (
        <div key={item._id} className="p-4 border-b last:border-b-0">
            <h3 className="font-bold text-lg mb-2">{item.discussion_comment_content}</h3>
            <p className="text-gray-600">{new Date(item.created_at).toLocaleDateString()} <span className="pl-24 text-gray-600">{'Discussion: ' + item.discussion_id.discussion_title}</span></p>
        </div>
      ))}
    </div>
  );
}