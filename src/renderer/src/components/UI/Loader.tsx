import React from 'react';

interface SpinnerProps {
  size?: string;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'w-[70px] h-[70px]',
  color = 'border-blue-500'
}) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div
        className={`inline-block ${size} border-4 border-t-transparent ${color} rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default Spinner;
