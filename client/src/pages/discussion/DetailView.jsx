import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArticleDetailPage from '../../components/discussion//Article/ArticleDetailPage';
import Aside from '../../components/discussion//Struct/Aside';
import Footer from '../../components/discussion//Struct/Footer';

const DetailView = () => {
  const { discussion_id } = useParams(); // 从 URL 获取讨论ID
  const [articleDetail, setArticleDetail] = useState(null); // 存储文章细节
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/api/discussions/getDiscussionById`,
          {params:{discussion_id}}); // 替换为实际的 API 路径
        setArticleDetail(response.data); // 假设返回的数据是符合预期的
        // console.log(response.data)
      } catch (err) { 
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
  }, [discussion_id]);

  if (loading) return <div>Loading...</div>; // 加载状态
  if (error) return <div>Error: {error.message}</div>; // 错误状态

  return (
    <div className="w-full">
      <div className="flex flex-col" style={{ width: '1100px', margin: '2cm auto 0' }}>
        <div className="flex flex-grow justify-center items-start">
          <div className="flex-grow">
          <ArticleDetailPage article={articleDetail} />
          </div>
          <div className="w-1/4 ml-4">
            <Aside /> 
          </div>
        </div>
      </div>
      {/* Footer 直接放在外层 div 内 */}
      <Footer />
    </div>
  );
};

export default DetailView;
