import React, { useState } from 'react';
import Comment from './Comment';
import { useParams } from 'react-router-dom';
// const commentsData = [
//   { author: 'Alice', text: 'Great article!' },
//   { author: 'Bob', text: 'Thanks for the insights.' },
// ];

const CommentList = ({commentsData,articleId}) => {
  // const { } = useParams(); // 从 URL 获取讨论ID
  const [trcommentsData, setCommentsData] = useState(commentsData);
  const [comments, setComments] = useState(commentsData);
  const [newCommentText, setNewCommentText] = useState('');


  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      const newComment = {
        articleId: articleId,
        userId: '66eec2e4a1e89011c1aa87e2', // Replace with actual user ID
        content: newCommentText,
      };

      try {
        const response = await fetch('http://localhost:3010/api/discussions/createComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        });

        if (!response.ok) {
          throw new Error('Failed to submit comment');
        }

        const savedComment = await response.json();
        // Add the new comment to the list
        setComments([...comments, { ...savedComment, replies: [] }]); // Ensure new comment has the right structure
        setNewCommentText(''); // Clear the input field
      } catch (error) {
        console.error(error); // Handle error
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
      {trcommentsData.map((comment, index) => (
        <Comment key={index} comment={comment} articleId={articleId}/>
      ))}
    </div>
  );
};

export default CommentList;
