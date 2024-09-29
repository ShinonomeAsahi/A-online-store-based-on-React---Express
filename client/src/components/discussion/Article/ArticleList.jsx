import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../provider/AuthProvider';
import ArticleItem from './ArticleItem';
import CreateDiscussionButton from '../Button/CreateDiscussionButton.jsx';

const ArticleList = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [createDiscussion, setCreateDiscussion] = useState(false);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/discussions/getDiscussionByCategory', {
          params: {
            category_id: category._id
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          throw new Error('获取的数据不是有效的数组');
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (category && category._id) {
      fetchArticles();
    }
  }, [category, token]);

  const handleCreateDiscussion = (discussion) => {
    setCreateDiscussion(true);
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>出现错误: {error.message}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{category.category_name}</h1>
        <CreateDiscussionButton onCreate={handleCreateDiscussion} category={[category]} />
      </div>
      {articles.length === 0 ? (
        <div>No Articles</div>
      ) : (
        articles.map((article) => (
          <ArticleItem key={article._id} article={article} />
        ))
      )}
    </div>
  );
};

export default ArticleList;
