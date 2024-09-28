import React from 'react';  
import ArticleList from '../Article/ArticleList';
import Tabs from '../Tab/Tabs';
function Content() {  
  return (  
    <main className="max-w-full" >  
    <div className="w-full h-[400px] bg-blue-500"></div>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center" >
      <Tabs />
    </div>
  </main> 
  );  
}  
  
export default Content;