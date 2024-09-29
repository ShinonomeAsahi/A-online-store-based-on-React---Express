import React, { useState, useEffect } from 'react';
import CommentList from '../Comment/CommentList';
import { useParams } from 'react-router-dom';

const ArticleDetailPage = ({ article, comment }) => { // 接收 article 作为 prop

  const formatDateTime = (dateString) => {
    
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true }; // 12小时制
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);
    // console.log(article)
    return `${formattedDate} at ${formattedTime}`; // 组合日期和时间
  };

  // 获取从10-16的随机整数
  const randomInt = () => {
    return Math.floor(Math.random() * 9) + 1;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      {/* 文章标题 */}
      <h1 className="text-3xl font-bold mb-4">{article.discussion_title}</h1>
      
      {/* 作者信息 */}
      <div className="flex items-center space-x-4 mb-6 text-gray-600">
        <img
          src={require('../../../assets/images/avatar/0' + randomInt() + '.png')}
          alt={`${article.created_by.user_name}'s avatar`}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{article.created_by.user_name}</p>
          <p className="text-sm">
            {formatDateTime(article.created_at)} • {article.commentsCount} Comments
          </p>
        </div>
      </div>
      
      {/* 正文内容 */}
      <div className="prose">
        <p>{article.content_body}</p>
      </div>

      {/* 评论部分 */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        <CommentList commentsData={comment} articleId={article._id}/>
        
      </div>
    </div>
  );
};

export default ArticleDetailPage;
