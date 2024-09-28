import React from 'react';  
import SearchBar from '../SearchBar/SearchBar ';
import DiscussList from '../DiscussList/DiscussList';
import LatestUpList from '../LatestUpList/LatestUpList';
import PopularList from '../DiscussList/DiscussList';
function Aside() {  
  return (  
    <aside className="min-h-screen max-w-full bg-gray-0 p-4 rounded shadow">   {/* 添加背景和样式 */}
      <ul>
        <li><SearchBar/></li>
        <li><DiscussList title='New Discussions'/></li>
        <li><LatestUpList/></li>
        <li><PopularList title='Polular Posts'/></li>
      </ul>
    </aside>  
  );  
}  
  
export default Aside;