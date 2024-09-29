// CreateDiscussionButton.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../provider/AuthProvider';

const CreateDiscussionButton = ({ onCreate, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { token, user_id } = useAuth();
  const categories = JSON.parse(localStorage.getItem('categories'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/discussions/createDiscussion',
        {
          created_by: user_id,
          discussion_title: title,
          discussion_body: content,
          discussion_category: selectedCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        onCreate(response.data); // 调用父组件传入的 onCreate 方法
        setTitle('');
        setContent('');
        setSelectedCategory('');
        setIsOpen(false); // 关闭模态框
      } else {
        throw new Error('Failed to create discussion');
      }
    } catch (error) {
      console.error(error); // 处理错误
    }
  };

  return (
    <div>
      <button
        className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition duration-200"
        onClick={() => setIsOpen(true)}
      >
        发布讨论
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">创建讨论</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">标题</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">内容</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="border rounded w-full p-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">分类</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                  <option value="" disabled>选择分类</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 text-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200"
                >
                  提交
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateDiscussionButton;