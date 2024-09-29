// Tabs.jsx
import React, { useState } from 'react';
import ArticleList from '../Article/ArticleList';
import PopularView from './PopularView';

const tabs = [
  { id: 1, label: '热榜', content: <PopularView title={'热榜'}/> },
  { id: 2, label: '最新', content: <ArticleList></ArticleList> },
  { id: 3, label: 'Following', content: <ArticleList></ArticleList> },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center border-b border-gray-300 mb-4">
        <div className="flex space-x-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`py-2 px-4 text-sm font-medium focus:outline-none rounded-lg transition ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* <button className="bg-gray-900 text-white py-1.5 px-4 rounded-lg shadow-md hover:bg-gray-800 transition duration-200">
          发布讨论
        </button> */}
      </div>
      <div className="p-6 bg-white shadow-md rounded-lg mt-4">
        {tabs.find(tab => tab.id === activeTab).content}
      </div>
    </div>
  );
};

export default Tabs;
