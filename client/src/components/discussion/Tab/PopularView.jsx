// Tabs.jsx
import React, { useState } from 'react';
import ArticleList from '../Article/ArticleList';
import Aside from '../Struct/Aside';

const PopularView = () => {
  
  return (
    <div className="flex justify-center items-start" style={{width:1100}}>
    <div className="flex-grow w-3/4">
      <ArticleList message="PopularList"/>
    </div>
    <div className="w-1/4">
      <Aside /> 
    </div>
  </div>  
  );
};

export default PopularView;
