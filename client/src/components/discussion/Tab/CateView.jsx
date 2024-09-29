  // Tabs.jsx
  import React, { useState } from "react";
  import ArticleList from "../Article/ArticleList";
  import Aside from "../Struct/Aside";

  const CateView = ({ category, newDiscussions, newUsers }) => {
    return (
      <div className="flex justify-center items-start" style={{ width: 1100 }}>
        <div className="flex-grow w-3/4">
          <ArticleList category={category} />
        </div>
        <div className="w-1/4">
          <Aside newDiscussions={newDiscussions} newUsers={newUsers}/>
        </div>
      </div>
    );
  };

  export default CateView;
