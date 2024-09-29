import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleDetailPage from "../../components/discussion//Article/ArticleDetailPage";
import { useAuth } from "../../provider/AuthProvider";
const DetailView = () => {
  const { discussion_id } = useParams(); // 从 URL 获取讨论ID
  const [articleDetail, setArticleDetail] = useState(null); // 存储文章细节
  const [articleComment, setArticleComment] = useState(null); // 存储文章评论
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [detailResponse, commentResponse] = await Promise.all([
          axios.get('http://localhost:3001/api/discussions/getDiscussionById', {
            params: { discussion_id },
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get('http://localhost:3001/api/discussions/getDiscussionCommentByDiscussionId', {
            params: { discussion_id },
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        setArticleDetail(detailResponse.data);
        setArticleComment(commentResponse.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (discussion_id && token) {
      fetchData();
    }
  }, [discussion_id, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!articleDetail) return <div>No article found</div>;

  return (
    <div className="w-full">
      <div
        className="flex flex-col"
        style={{ width: "1100px", margin: "2cm auto 0" }}
      >
        <div className="flex flex-grow justify-center items-start">
          <div className="flex-grow">
            <ArticleDetailPage article={articleDetail} comment={articleComment} />
          </div>
          {/* <div className="w-1/4 ml-4">
            <Aside />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DetailView;
