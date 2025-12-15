import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/about',
    component: ComponentCreator('/about', 'ca4'),
    exact: true
  },
  {
    path: '/contact',
    component: ComponentCreator('/contact', 'a03'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'e78'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'efb'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '3b7'),
            routes: [
              {
                path: '/docs/author-bio',
                component: ComponentCreator('/docs/author-bio', '625'),
                exact: true
              },
              {
                path: '/docs/chapter-1/',
                component: ComponentCreator('/docs/chapter-1/', '30c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-1/topic-1',
                component: ComponentCreator('/docs/chapter-1/topic-1', '545'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-1/topic-2',
                component: ComponentCreator('/docs/chapter-1/topic-2', 'e2d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-2/',
                component: ComponentCreator('/docs/chapter-2/', 'f71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-2/topic-1',
                component: ComponentCreator('/docs/chapter-2/topic-1', 'f8e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-2/topic-2',
                component: ComponentCreator('/docs/chapter-2/topic-2', '663'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-3/',
                component: ComponentCreator('/docs/chapter-3/', '176'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-3/topic-1',
                component: ComponentCreator('/docs/chapter-3/topic-1', '556'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-3/topic-2',
                component: ComponentCreator('/docs/chapter-3/topic-2', '645'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-4/',
                component: ComponentCreator('/docs/chapter-4/', '709'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-4/topic-1',
                component: ComponentCreator('/docs/chapter-4/topic-1', '74f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-4/topic-2',
                component: ComponentCreator('/docs/chapter-4/topic-2', 'cdf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-5/',
                component: ComponentCreator('/docs/chapter-5/', '308'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-5/topic-1',
                component: ComponentCreator('/docs/chapter-5/topic-1', '3ed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter-5/topic-2',
                component: ComponentCreator('/docs/chapter-5/topic-2', 'f6f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '65e'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
