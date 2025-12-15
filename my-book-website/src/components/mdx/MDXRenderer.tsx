import React, { useState, useEffect } from 'react';
import { useScrollTracking } from '../utils/scrollTracker';
import ProgressBar from '../components/ui/ProgressBar';
import ChapterNav from '../components/navigation/ChapterNav';
import { mockChapters } from '../utils/mockData';

interface MDXRendererProps {
  chapterId: string;
  topicId: string;
  children: React.ReactNode;
}

const MDXRenderer: React.FC<MDXRendererProps> = ({ chapterId, topicId, children }) => {
  const [progress, setProgress] = useState<number>(0);
  
  // Use the scroll tracking hook
  const trackedProgress = useScrollTracking({
    chapterId,
    topicId,
    onProgressChange: setProgress
  });

  // Update the progress state when tracked progress changes
  useEffect(() => {
    setProgress(trackedProgress);
  }, [trackedProgress]);

  return (
    <div className="mdx-content">
      <ProgressBar progress={progress} />
      {children}
      <ChapterNav 
        chapters={mockChapters} 
        currentChapterId={chapterId} 
        currentTopicId={topicId} 
      />
    </div>
  );
};

export default MDXRenderer;