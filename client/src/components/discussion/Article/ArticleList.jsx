// ArticleList.jsx
import React from 'react';
import ArticleItem from './ArticleItem';

const articles = [
  {
    id: 1,
    title: "如何使用 React 和 Tailwind CSS",
    author: "John Doe",
    date: "2024-09-27",
    likes: 25,
    comments: 15,
    authorImg: "https://via.placeholder.com/40",
    usersImgs: [
      "https://via.placeholder.com/30",
      "https://via.placeholder.com/30",
      "https://via.placeholder.com/30"
    ]
  },
  {
    id: 2,
    title: "JavaScript 的新特性",
    author: "Jane Smith",
    date: "2024-09-26",
    likes: 30,
    comments: 10,
    authorImg: "https://via.placeholder.com/40",
    usersImgs: [
      "https://via.placeholder.com/30",
      "https://via.placeholder.com/30"
    ]
  },
  // 更多文章数据...
];

const ArticleList = ({message}) => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{message}</h1>
      {articles.map(article => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
