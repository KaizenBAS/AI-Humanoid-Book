import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number;
  title?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, title = "Reading Progress" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay to allow for animation on initial load
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r from-blue-400 to-indigo-600 transition-all duration-500 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;