// ArticleItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
const ArticleItem = ({ article }) => {
  const navigate = useNavigate();
  const handleTitleClick = () => {
    navigate('/discussion/detail');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-center mb-4">
        <img src={article.authorImg} alt={article.author} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h2 className="font-semibold text-lg cursor-pointer"  onClick={handleTitleClick}>{article.title}</h2>
          <p className="text-gray-500 text-sm">{article.author} | {article.date}</p>
        </div>
      </div>
      <div className="flex justify-between text-gray-600">
        <div className="flex items-center">
          <span className="mr-2">👍 {article.likes}</span>
          <span className="mr-2">💬 {article.comments}</span>
        </div>
        <div className="flex space-x-2">
          {article.usersImgs.map((img, index) => (
            <img key={index} src={img} alt="User" className="w-8 h-8 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
