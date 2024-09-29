// ListItem.jsx
import React from 'react';

const ListItem = ({ author, title, date, commentsCount }) => {
  // 随机获取1-9的整数
  const randomInt = Math.floor(Math.random() * 9) + 1;
  return (
    <div className="flex flex-col p-4 border-b border-gray-300">
      <div className="flex items-center mb-1"> {/* 调整底部留白 */}
        <img
          src={require(`../../../assets/images/avatar/0${randomInt}.png`)}
          alt={author.name}
          className="w-5 h-5 rounded-full mr-2"
        />
        <span className="text-gray-700 font-semibold text-xs">{author.name}</span> {/* 更小字体 */}
      </div>
      <span className="font-bold text-sm text-gray-800">{title}</span> {/* 修改为 text-sm */}
      <div className="text-xs text-gray-500 mt-1"> {/* 更小字体 */}
        {date} • {commentsCount} Comments
      </div>
    </div>
  );
};

export default ListItem;
