import React, { useState } from 'react';
import { useAuth } from '../../../provider/AuthProvider';
import axios from 'axios';

const Comment = ({ comment, articleId }) => {
  const [replies, setReplies] = useState(comment.replies || []);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false); // 控制回复框的显示
  const { token, user_id } = useAuth();

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/discussions/createDiscussionComment",
          {
            discussion_comment_parent_id: comment._id,
            discussion_id: articleId,
            discussion_comment_user_id: user_id,
            discussion_comment_content: replyText,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log('comment_id: ', comment._id)

        const savedComment = response.data;
        // 添加新的回复
        setReplies([...replies, { ...savedComment, replies: [] }]); // 确保新回复具有正确结构
        setReplyText(''); // 清空输入框
        setShowReplyInput(false); // 提交后隐藏输入框
      } catch (error) {
        console.error(error); // 处理错误
      }
    }
  };

  const randomInt = () => {
    return Math.floor(Math.random() * 9) + 1;
  }

  return (
    <div className="border-l-2 border-gray-300 pl-4 mt-6">
      <div className="flex items-center">
        {/* 显示头像 */}
        <img
          src={require('../../../assets/images/avatar/0' + randomInt() + '.png')} // 替换为用户头像的 URL 或默认图像
          alt="User Avatar"
          className="w-6 h-6 rounded-full mr-2" // 设置头像样式
        />
        <p className="font-semibold">{comment.discussion_comment_user_id.user_name}</p>
      </div>
      <p className="text-sm text-gray-600">{comment.discussion_comment_content}</p>
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
          {replies.map(reply => (
            <Comment key={reply._id} comment={reply} articleId={articleId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
