import React, { useState } from 'react';

const Comment = ({ comment }) => {
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false); // 控制回复框的显示

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      setReplies([...replies, { text: replyText, replies: [] }]);
      setReplyText(''); // 清空输入框
      setShowReplyInput(false); // 提交后隐藏输入框
    }
  };

  return (
    <div className="border-l-2 border-gray-300 pl-4 mt-2">
      <p className="font-semibold">{comment.author}</p>
      <p className="text-sm text-gray-600">{comment.text}</p>
      <button 
        className="text-blue-500 text-sm mt-1" 
        onClick={() => setShowReplyInput(!showReplyInput)} // 切换输入框的显示状态
      >
        Reply
      </button>

      {/* 回复输入框 */}
      {showReplyInput && (
        <form onSubmit={handleReplySubmit} className="mt-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="border rounded p-1 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white rounded p-1 mt-1">
            Submit
          </button>
        </form>
      )}

      {/* 显示子评论 */}
      {replies.length > 0 && (
        <div className="mt-2">
          {replies.map((reply, index) => (
            <Comment key={index} comment={{ author: 'You', text: reply.text }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
