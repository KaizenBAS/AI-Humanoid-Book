import React, { useEffect } from 'react';
import OriginalDocPage from '@theme-original/DocPage';
import { useScrollTracking } from '@site/src/utils/scrollTracker';
import { mockChapters } from '@site/src/utils/mockData';
import ChapterNav from '@site/src/components/navigation/ChapterNav';
import ProgressBar from '@site/src/components/ui/ProgressBar';

// Get the slug from the location pathname
const getChapterAndTopicIds = (location: { pathname: string }) => {
  // Path format: /docs/category/slug or /docs/slug
  const pathParts = location.pathname.split('/').filter(p => p !== '');
  const docsIndex = pathParts.indexOf('docs');
  
  if (docsIndex !== -1 && docsIndex + 1 < pathParts.length) {
    // Extract the doc ID which follows the docs path
    const docId = pathParts[docsIndex + 1];
    
    // If we have a subpath like chapter-1/topic-1, process it
    if (pathParts.length > docsIndex + 2) {
      const chapterId = pathParts[docsIndex + 1];
      const topicId = pathParts[docsIndex + 2];
      return { chapterId, topicId };
    } else {
      // If it's just /docs/slug, try to determine chapter/topic from the slug
      const slug = pathParts[docsIndex + 1];
      // For index pages like chapter-1/index, the slug would be "chapter-1"
      if (slug.includes("chapter-")) {
        return { chapterId: slug, topicId: "index" };
      }
      return { chapterId: "unknown", topicId: slug };
    }
  }
  
  return { chapterId: "unknown", topicId: "unknown" };
};

export default function DocPage(props) {
  const { location } = props;
  
  const { chapterId, topicId } = getChapterAndTopicIds(location);
  
  // Use scroll tracking hook
  const progress = useScrollTracking({ 
    chapterId, 
    topicId,
    onProgressChange: () => {} // We already handle the saving in the hook
  });

  return (
    <>
      <OriginalDocPage {...props} />
      <div className="container margin-vert--lg">
        <ProgressBar progress={progress} />
        <ChapterNav 
          chapters={mockChapters} 
          currentChapterId={chapterId} 
          currentTopicId={topicId} 
        />
      </div>
    </>
  );
}