import { useEffect, useState } from 'react';
import { loadReadingProgress, saveReadingProgress } from './storage';
import { ReadingProgress } from '../types/global';

interface ScrollTrackerProps {
  chapterId: string;
  topicId: string;
  onProgressChange?: (progress: number) => void;
}

// Custom hook to track scroll progress
export const useScrollTracking = ({ chapterId, topicId, onProgressChange }: ScrollTrackerProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = window.pageYOffset;
      const docHeight = Math.max(
        document.body.scrollHeight, 
        document.body.offsetHeight, 
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
      const newProgress = Math.min(Math.max(scrollPercent, 0), 100);
      
      setProgress(newProgress);
      
      // Update parent component if provided
      if (onProgressChange) {
        onProgressChange(newProgress);
      }
      
      // Save progress to localStorage
      const progressData: ReadingProgress = {
        userId: 'anonymous', // In a real app, this would be a proper user ID
        chapterId,
        topicId,
        progressPercentage: newProgress,
        lastReadDate: new Date().toISOString()
      };
      
      saveReadingProgress(progressData);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize progress if we have saved data
    const savedProgress = loadReadingProgress();
    if (savedProgress && savedProgress.chapterId === chapterId && savedProgress.topicId === topicId) {
      setProgress(savedProgress.progressPercentage);
      if (onProgressChange) {
        onProgressChange(savedProgress.progressPercentage);
      }
    }

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [chapterId, topicId, onProgressChange]);

  return progress;
};