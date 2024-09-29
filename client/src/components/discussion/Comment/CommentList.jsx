import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../provider/AuthProvider';
import axios from 'axios';

const CommentList = ({ commentsData, articleId }) => {
  const [trcommentsData, setCommentsData] = useState(commentsData || []);
  const [replies, setReplies] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const { token, user_id } = useAuth();

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/discussions/createDiscussionComment",
          {
            discussion_id: articleId,
            discussion_comment_user_id: user_id,
            discussion_comment_content: newCommentText,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const savedComment = await response.data;
        console.log(savedComment)

        setNewCommentText(''); // Clear the input field
      } catch (error) {
        console.error(error); // 处理错误
      }
    }
  };

  return (
    <div>
      {/* 顶级评论输入框 */}
      <form onSubmit={handleNewCommentSubmit} className="mb-4">
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="border border-gray-300 rounded-lg p-4 w-full h-32 focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
        />
        <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded hover:bg-white hover:text-gray-900 hover:border hover:border-gray-900 transition-all duration-500 mt-1">
          Submit
        </button>
      </form>

      {/* 评论列表 */}
      {trcommentsData && trcommentsData.length > 0 ? (
        trcommentsData.map((comment, index) => (
          <Comment key={index} comment={comment} articleId={articleId} />
        ))
      ) : (
        <div>No comments available</div>
      )}
    </div>
  );
};

export default CommentList;