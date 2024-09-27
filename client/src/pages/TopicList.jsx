import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TopicList = () => {
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    const fetchTopicList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/contents/getTopicList');
        setTopicList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopicList();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Community Topics</h1>
      <ul className="space-y-8">
        {topicList.map(topic => (
          <li key={topic.content_id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{topic.content_title}</h2>
            <p className="text-gray-600 mb-4">{new Date(topic.created_at).toLocaleDateString()}</p>
            <Link to={`/topic/${topic.content_id}`} className="text-indigo-600 hover:underline">Join discussion</Link>
          </li>
        ))}
      </ul>
      <Link to="/create-topic" className="mt-8 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Create New Topic</Link>
    </div>
  );
};

export default TopicList;