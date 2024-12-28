import React from 'react';

const TrackLayoutSkeleton: React.FC = () => {
  return (
    <div className="flex items-center w-full gap-4 p-4 rounded-lg bg-gray-800 animate-pulse">
      <div className="flex-shrink-0 w-11 h-11 sm:w-11 sm:h-11 rounded-md bg-gray-700"></div>
      <div className="flex flex-col flex-grow">
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
      <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      <div className="w-10 h-4 bg-gray-700 rounded"></div>
    </div>
  );
};

export default TrackLayoutSkeleton;
