// CreateDiscussionButton.js
import React, { useState } from 'react';

const CreateDiscussionButton = ({ onCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, content, category }); // 调用父组件传入的 onCreate 方法
    setTitle('');
    setContent('');
    setCategory('');
    setIsOpen(false); // 关闭模态框
  };

  return (
    <div>
      <button
        className="bg-gray-900 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition duration-200"
        onClick={() => setIsOpen(true)}
      >
        发布讨论
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="border rounded w-full p-2"
                />
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
                  className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200"
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
