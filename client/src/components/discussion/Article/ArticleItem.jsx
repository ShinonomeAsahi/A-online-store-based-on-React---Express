// ArticleItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
const ArticleItem = ({ article }) => {

  const navigate = useNavigate();
  const handleTitleClick = (discussion_id) => {
    navigate(`/discussion/detail/${discussion_id}`);
  };

  const formatDateTime = (dateString) => {
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true }; // 12小时制
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return `${formattedDate} at ${formattedTime}`; // 组合日期和时间
  };

  const randomInt = () => {
    return Math.floor(Math.random() * 9) + 1;
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-center mb-4">
        <img src={require(`../../../assets/images/avatar/0${randomInt()}.png`)} alt={article.author} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h2 className="font-semibold text-lg cursor-pointer"  onClick={() => handleTitleClick(article._id)}>{article.discussion_title}</h2>
          <p className="text-gray-500 text-sm">{article.created_by.username} |  {formatDateTime(article.created_at)}</p>
        </div>
      </div>
      <div className="flex justify-between text-gray-600">
        <div className="flex items-center">
          {/* <span className="mr-2">👍 {article.likes}</span> */}
          <span className="mr-2">💬 {article.commentsCount}</span>
        </div>
        <div className="flex space-x-2">
        <>
          <img src={require(`../../../assets/images/avatar/0${randomInt()}.png`)} alt="User 1" className="w-8 h-8 rounded-full" />
          <img src={require(`../../../assets/images/avatar/0${randomInt()}.png`)} alt="User 2" className="w-8 h-8 rounded-full" />
          <img src={require(`../../../assets/images/avatar/0${randomInt()}.png`)} alt="User 3" className="w-8 h-8 rounded-full" />
        </>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
