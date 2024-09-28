import React from 'react';
import ArticleDetailPage from '../../components/discussion//Article/ArticleDetailPage';
import Aside from '../../components/discussion//Struct/Aside';
import Footer from '../../components/discussion//Struct/Footer';

const DetailView = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col" style={{ width: '1100px', margin: '2cm auto 0' }}>
        <div className="flex flex-grow justify-center items-start">
          <div className="flex-grow">
            <ArticleDetailPage />
          </div>
          <div className="w-1/4 ml-4">
            <Aside /> 
          </div>
        </div>
      </div>
      {/* Footer 直接放在外层 div 内 */}
      <Footer />
    </div>
  );
};

export default DetailView;
