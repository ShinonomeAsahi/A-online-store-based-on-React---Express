// Tabs.jsx
import React, { useState } from 'react';
import ArticleList from '../Article/ArticleList';
import PopularView from './PopularView';

const tabs = [
  { id: 1, label: 'Popular', content: <PopularView/> },
  { id: 2, label: 'Newest', content: <ArticleList></ArticleList> },
  { id: 3, label: 'Following', content: <ArticleList></ArticleList> },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="mx-auto" >
      <div className="flex space-x-4 border-b border-gray-300">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`py-2 px-4 text-sm font-medium focus:outline-none rounded-lg transition ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'text-blue-600 hover:bg-blue-100'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6 bg-white shadow-md rounded-lg mt-4">
        {tabs.find(tab => tab.id === activeTab).content}
      </div>
    </div>
  );
};

export default Tabs;
