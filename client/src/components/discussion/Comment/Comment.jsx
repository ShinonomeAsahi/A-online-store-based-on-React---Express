import React, { useState } from 'react';

const Comment = ({ comment, articleId }) => {
  const [replies, setReplies] = useState(comment.replies || []); // 使用传入的回复初始化
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false); // 控制回复框的显示

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      const newReply = {
        articleId: articleId,
        parentCommentId: comment._id, // 将父评论 ID 传递给 API
        userId: '66eec2e4a1e89011c1aa87e2', // 假设当前用户 ID
        content: replyText,
      };

      try {
        const response = await fetch('http://localhost:3010/api/discussions/createComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReply),
        });

        if (!response.ok) {
          throw new Error('Failed to submit reply');
        }

        const savedComment = await response.json();
        // 添加新的回复
        setReplies([...replies, { ...savedComment, replies: [] }]); // 确保新回复具有正确结构
        setReplyText(''); // 清空输入框
        setShowReplyInput(false); // 提交后隐藏输入框
      } catch (error) {
        console.error(error); // 处理错误
      }
    }
  };

  return (
    <div className="border-l-2 border-gray-300 pl-4 mt-2">
      <div className="flex items-center">
        {/* 显示头像 */}
        <img
          src={'https://picsum.photos/200'} // 替换为用户头像的 URL 或默认图像
          alt="User Avatar"
          className="w-6 h-6 rounded-full mr-2" // 设置头像样式
        />
        <p className="font-semibold">{comment.userId.user_name}</p>
      </div>
      <p className="text-sm text-gray-600">{comment.content}</p>
      <button 
        className="text-blue-500 text-sm mt-1" 
        onClick={() => setShowReplyInput(!showReplyInput)} // 切换输入框的显示状态
      >
        Reply
      </button>

      {/* 回复输入框 */}
      {showReplyInput && (
        <form onSubmit={handleReplySubmit} className="mt-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="border rounded p-4 w-full h-22 focus:outline-none focus:ring-2 focus:ring-gray-900 transition duration-200"
          />

          <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded hover:bg-white hover:text-gray-900 hover:border hover:border-gray-900 transition-all duration-500 mt-1">
            Submit
          </button>
        </form>
      )}

      {/* 显示子评论 */}
      {replies.length > 0 && (
        <div className="mt-2">
          {replies.map((reply, index) => (
            <Comment key={index} comment={reply} articleId={articleId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
