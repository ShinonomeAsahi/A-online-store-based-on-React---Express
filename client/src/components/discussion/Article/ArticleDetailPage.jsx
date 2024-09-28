// ArticleDetailPage.jsx
import React from 'react';
import CommentList from '../Comment/CommentList'

const ArticleDetailPage = () => {
  const article = {
    title: "Understanding React Hooks",
    author: {
      name: "Jane Doe",
      avatar: "https://via.placeholder.com/40",
    },
    date: "2024-09-28",
    commentsCount: 5,
    content: `
      React Hooks are a new addition in React 16.8 that let you use state and other React features without writing a class.
      Hooks are JavaScript functions, but they impose two rules:
      1. Only call hooks at the top level.
      2. Only call hooks from React functions.
      
      By following these rules, you can build encapsulated stateful logic that can be shared across components.
    `,
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* 文章标题 */}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      
      {/* 作者信息 */}
      <div className="flex items-center space-x-4 mb-6 text-gray-600">
        <img
          src={article.author.avatar}
          alt={`${article.author.name}'s avatar`}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{article.author.name}</p>
          <p className="text-sm">
            {article.date} • {article.commentsCount} Comments
          </p>
        </div>
      </div>
      
      {/* 正文内容 */}
      <div className="prose">
        <p>{article.content}</p>
      </div>

           {/* 评论部分 */}
        <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        <CommentList />
      </div>
    </div>

    
  );
};

export default ArticleDetailPage;
