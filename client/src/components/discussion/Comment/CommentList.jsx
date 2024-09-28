import React, { useState } from 'react';
import Comment from './Comment';

const commentsData = [
  { author: 'Alice', text: 'Great article!' },
  { author: 'Bob', text: 'Thanks for the insights.' },
];

const CommentList = () => {
  const [comments, setComments] = useState(commentsData);
  const [newCommentText, setNewCommentText] = useState('');

  const handleNewCommentSubmit = (e) => {
    e.preventDefault();
    if (newCommentText.trim()) {
      setComments([...comments, { author: 'You', text: newCommentText }]);
      setNewCommentText(''); // 清空输入框
    }
  };

  return (
    <div>
      {/* 顶级评论输入框 */}
      <form onSubmit={handleNewCommentSubmit} className="mb-4">
        <input
          type="text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="border rounded p-1 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-1 mt-1">
          Submit
        </button>
      </form>

      {/* 评论列表 */}
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
