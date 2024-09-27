import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider";

const ContentList = () => {
  const [contentList, setContentList] = useState([]);
  const [contentType, setContentType] = useState("blog");
  const { token } = useAuth(); // Use token from AuthProvider
  console.log("token:", token);

  useEffect(() => {
    const fetchContentList = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`, // Add JWT token to request headers
        };
        console.log("Request Headers:", headers); // Debugging: Log the request headers
        const response = await axios.get(
          `http://localhost:3001/api/contents/getTopicList`,
          { headers }
        );
        setContentList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContentList();
  }, [contentType]);

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* ... (keep the existing SVG background) ... */}
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {contentType === "blog" ? "Blogs" : "Topics"}
          </h1>
          <div>
            <button
              onClick={() => setContentType("blog")}
              className={`mr-2 px-4 py-2 rounded ${
                contentType === "blog"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Blogs
            </button>
            <button
              onClick={() => setContentType("topic")}
              className={`px-4 py-2 rounded ${
                contentType === "topic"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Topics
            </button>
          </div>
        </div>
        <ul className="space-y-8">
          {contentList.map((content) => (
            <li
              key={content.content_id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {content.content_title}
              </h2>
              <p className="text-gray-600 mb-4">
                {new Date(content.created_at).toLocaleDateString()}
              </p>
              <Link
                to={`/${contentType}/${content.content_id}`}
                className="text-indigo-600 hover:underline"
              >
                {contentType === "blog" ? "Read more" : "Join discussion"}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={`/create-${contentType}`}
          className="mt-8 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create New {contentType === "blog" ? "Blog" : "Topic"}
        </Link>
      </div>
    </div>
  );
};

export default ContentList;
