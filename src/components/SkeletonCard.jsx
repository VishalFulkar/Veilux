import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="block flex flex-col items-start bg-transparent overflow-hidden animate-pulse">
      {/* Target Image Block matching ResultCard aspect-[3/4] */}
      <div className="w-full aspect-[3/4] bg-gray-200 mb-4 rounded-sm"></div>
      
      {/* Title block */}
      <div className="w-full flex justify-between items-start pt-1">
        <div className="w-2/3 h-5 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
