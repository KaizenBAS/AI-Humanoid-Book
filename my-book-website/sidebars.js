// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Chapter 1',
      items: ['chapter-1/index', 'chapter-1/topic-1', 'chapter-1/topic-2'],
    },
    {
      type: 'category',
      label: 'Chapter 2',
      items: ['chapter-2/index', 'chapter-2/topic-1', 'chapter-2/topic-2'],
    },
    {
      type: 'category',
      label: 'Chapter 3',
      items: ['chapter-3/index', 'chapter-3/topic-1', 'chapter-3/topic-2'],
    },
    {
      type: 'category',
      label: 'Chapter 4',
      items: ['chapter-4/index', 'chapter-4/topic-1', 'chapter-4/topic-2'],
    },
    {
      type: 'category',
      label: 'Chapter 5',
      items: ['chapter-5/index', 'chapter-5/topic-1', 'chapter-5/topic-2'],
    },
  ],
};

export default sidebars;