import React from 'react';
import Link from '@docusaurus/Link';
import { Chapter, Topic } from '../../types/global';

interface ChapterNavProps {
  chapters: Chapter[];
  currentChapterId: string;
  currentTopicId: string;
}

const ChapterNav: React.FC<ChapterNavProps> = ({ chapters, currentChapterId, currentTopicId }) => {
  const currentChapterIndex = chapters.findIndex(ch => ch.id === currentChapterId);
  
  // Find the current topic's index within the current chapter
  const currentTopicIndex = currentChapterIndex !== -1 
    ? chapters[currentChapterIndex].topics.findIndex(t => t.id === currentTopicId)
    : -1;

  // Determine next and previous navigation links
  let nextLink = null;
  let prevLink = null;

  if (currentChapterIndex !== -1 && currentTopicIndex !== -1) {
    // Check if there's a next topic in the current chapter
    if (currentTopicIndex + 1 < chapters[currentChapterIndex].topics.length) {
      const nextTopic = chapters[currentChapterIndex].topics[currentTopicIndex + 1];
      nextLink = `/docs/${currentChapterId}/${nextTopic.id}`;
    } 
    // Otherwise, go to the next chapter's first topic
    else if (currentChapterIndex + 1 < chapters.length) {
      const nextChapter = chapters[currentChapterIndex + 1];
      nextLink = `/docs/${nextChapter.id}/topic-1`; // Assuming topic-1 is the first
    }

    // Check if there's a previous topic in the current chapter  
    if (currentTopicIndex - 1 >= 0) {
      const prevTopic = chapters[currentChapterIndex].topics[currentTopicIndex - 1];
      prevLink = `/docs/${currentChapterId}/${prevTopic.id}`;
    }
    // Otherwise, go to the previous chapter's last topic
    else if (currentChapterIndex - 1 >= 0) {
      const prevChapter = chapters[currentChapterIndex - 1];
      const lastTopic = prevChapter.topics[prevChapter.topics.length - 1];
      prevLink = `/docs/${prevChapter.id}/${lastTopic.id}`;
    }
  }

  return (
    <div className="chapter-navigation">
      <div className="flex justify-between items-center py-6">
        <div>
          {prevLink && (
            <Link to={prevLink} className="button button--secondary">
              ← Previous
            </Link>
          )}
        </div>
        
        <div className="text-center">
          <div className="text-sm text-gray-500">
            Chapter {currentChapterIndex + 1} of {chapters.length}
          </div>
        </div>
        
        <div>
          {nextLink && (
            <Link to={nextLink} className="button button--primary">
              Next →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterNav;