import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const baseURL = 'http://localhost:3001/api/contents';

const TopicDetail = () => {
  const { content_id } = useParams();
  const [topic, setTopic] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(`${baseURL}/getTopicById`, {
          params: { content_id: content_id }
        });
        setTopic(response.data);
      } catch (error) {
        console.error('Error fetching topic', error);
      }
    };
    fetchTopic();
  }, [content_id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/addComment`, {
        content_id: content_id,
        comment_body: newComment,
        user_id: localStorage.getItem('user_id') // Assuming you store user_id in localStorage
      });
      // Refresh the topic to show the new comment
      const response = await axios.get(`${baseURL}/getTopicById`, {
        params: { content_id: content_id }
      });
      setTopic(response.data);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  if (!topic) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">{topic.content_title}</h1>
      <p className="text-gray-600 mb-4">{new Date(topic.created_at).toLocaleDateString()}</p>
      <div className="prose mb-8">{topic.content_body}</div>
      
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {topic.Comments && topic.Comments.map(comment => (
        <div key={comment.comment_id} className="mb-4 p-4 bg-gray-100 rounded">
          <p>{comment.comment_body}</p>
          <p className="text-sm text-gray-600 mt-2">By {comment.User.user_name} on {new Date(comment.created_at).toLocaleString()}</p>
        </div>
      ))}

      <form onSubmit={handleCommentSubmit} className="mt-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="Add a comment..."
        ></textarea>
        <button type="submit" className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Post Comment
        </button>
      </form>

      <Link to="/topics" className="mt-8 inline-block text-indigo-600 hover:underline">Back to topics</Link>
    </div>
  );
};

export default TopicDetail;