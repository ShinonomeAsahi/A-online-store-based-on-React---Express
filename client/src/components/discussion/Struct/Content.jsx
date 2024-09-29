import React from 'react';  
import ArticleList from '../Article/ArticleList';
import Tabs from '../Tab/Tabs';
import forumBanner from "../../../assets/images/forumBanner.jpg";

function Content() {  
  return (  
    <main className="max-w-full" >  
    <div className="w-full h-[400px] border-b-2 border-b-gray-200 shadow-md">
      <img src={forumBanner} alt="forumBanner" className="w-full h-full object-cover" />
    </div>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-6" >
      <Tabs />
    </div>
  </main> 
  );  
}  
  
export default Content;