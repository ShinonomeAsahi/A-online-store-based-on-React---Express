import React, { useState, useEffect } from 'react';
import { getDiscussions } from '../../../api/discussionApi.js'; // 导入你的 API 函数
import ArticleItem from './ArticleItem';
import CreateDiscussionButton from '../Button/CreateDiscussionButton.jsx';
import axios from 'axios';

const ArticleList = ({ message }) => {
  const [articles, setArticles] = useState([]); // 初始化为预设文章
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3010/api/discussions/getDiscussionList'); // 获取讨论数据
        
        // 确保 data 是数组
        if (Array.isArray(response.data)) {
          setArticles(response.data); // 更新状态
        } else {
          throw new Error('获取的数据不是有效的数组'); // 抛出错误
        }
      } catch (err) {
        setError(err); // 捕获错误
      } finally {
        setLoading(false); // 请求完成
      }
    };

    fetchArticles();
  }, []); // 只在组件挂载时执行一次

  // 加载状态
  if (loading) {
    return <div>加载中...</div>; // 显示加载中的指示器
  }

  // 错误处理
  if (error) {
    return <div>出现错误: {error.message}</div>; // 显示错误信息
  }

  // 渲染文章列表
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{message}</h1>
        {/* <button className="bg-gray-900 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition duration-200">
          发布讨论
        </button> */}
        <CreateDiscussionButton></CreateDiscussionButton>
      </div>
      {articles.length === 0 ? (
        <div>没有文章可显示</div> // 当没有文章时的提示
      ) : (
        articles.map((article) => (
          <ArticleItem key={article.id} article={article} /> // 使用 article.id 作为 key
        ))
      )}
    </div>
  );
};

export default ArticleList;
