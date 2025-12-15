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
    component: ComponentCreator('/docs', 'bb2'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '58d'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'de0'),
            routes: [
              {
                path: '/docs/author-bio',
                component: ComponentCreator('/docs/author-bio', '625'),
                exact: true
              },
              {
                path: '/docs/chapter-1/',
                component: ComponentCreator('/docs/chapter-1/', '332'),
                exact: true
              },
              {
                path: '/docs/chapter-1/topic-1',
                component: ComponentCreator('/docs/chapter-1/topic-1', '371'),
                exact: true
              },
              {
                path: '/docs/chapter-1/topic-2',
                component: ComponentCreator('/docs/chapter-1/topic-2', '5e1'),
                exact: true
              },
              {
                path: '/docs/chapter-2/',
                component: ComponentCreator('/docs/chapter-2/', 'eda'),
                exact: true
              },
              {
                path: '/docs/chapter-2/topic-1',
                component: ComponentCreator('/docs/chapter-2/topic-1', '381'),
                exact: true
              },
              {
                path: '/docs/chapter-2/topic-2',
                component: ComponentCreator('/docs/chapter-2/topic-2', '187'),
                exact: true
              },
              {
                path: '/docs/chapter-3/',
                component: ComponentCreator('/docs/chapter-3/', '994'),
                exact: true
              },
              {
                path: '/docs/chapter-3/topic-1',
                component: ComponentCreator('/docs/chapter-3/topic-1', '18a'),
                exact: true
              },
              {
                path: '/docs/chapter-3/topic-2',
                component: ComponentCreator('/docs/chapter-3/topic-2', 'd77'),
                exact: true
              },
              {
                path: '/docs/chapter-4/',
                component: ComponentCreator('/docs/chapter-4/', 'eba'),
                exact: true
              },
              {
                path: '/docs/chapter-4/topic-1',
                component: ComponentCreator('/docs/chapter-4/topic-1', '3df'),
                exact: true
              },
              {
                path: '/docs/chapter-4/topic-2',
                component: ComponentCreator('/docs/chapter-4/topic-2', '994'),
                exact: true
              },
              {
                path: '/docs/chapter-5/',
                component: ComponentCreator('/docs/chapter-5/', '1cf'),
                exact: true
              },
              {
                path: '/docs/chapter-5/topic-1',
                component: ComponentCreator('/docs/chapter-5/topic-1', '30b'),
                exact: true
              },
              {
                path: '/docs/chapter-5/topic-2',
                component: ComponentCreator('/docs/chapter-5/topic-2', '27c'),
                exact: true
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '65e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/week-13/conversation-design',
                component: ComponentCreator('/docs/week-13/conversation-design', 'd4b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/week-13/gpt-integration',
                component: ComponentCreator('/docs/week-13/gpt-integration', 'ad9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/week-13/intro',
                component: ComponentCreator('/docs/week-13/intro', '1f2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/week-13/multi-modal-interaction',
                component: ComponentCreator('/docs/week-13/multi-modal-interaction', '75c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/week-13/speech-recognition',
                component: ComponentCreator('/docs/week-13/speech-recognition', '0ed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-1-2/foundations',
                component: ComponentCreator('/docs/weeks-1-2/foundations', 'c0a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-1-2/from-digital-ai',
                component: ComponentCreator('/docs/weeks-1-2/from-digital-ai', '7cc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-1-2/humanoid-landscape',
                component: ComponentCreator('/docs/weeks-1-2/humanoid-landscape', '30f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-1-2/intro',
                component: ComponentCreator('/docs/weeks-1-2/intro', '6be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-1-2/sensor-systems',
                component: ComponentCreator('/docs/weeks-1-2/sensor-systems', '14e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-11-12/bipedal-locomotion',
                component: ComponentCreator('/docs/weeks-11-12/bipedal-locomotion', 'a67'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-11-12/human-robot-interaction',
                component: ComponentCreator('/docs/weeks-11-12/human-robot-interaction', '440'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-11-12/intro',
                component: ComponentCreator('/docs/weeks-11-12/intro', 'f5e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-11-12/kinematics-dynamics',
                component: ComponentCreator('/docs/weeks-11-12/kinematics-dynamics', 'ed1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-11-12/manipulation-grasping',
                component: ComponentCreator('/docs/weeks-11-12/manipulation-grasping', '6b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-3-5/building-packages',
                component: ComponentCreator('/docs/weeks-3-5/building-packages', '63d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-3-5/intro',
                component: ComponentCreator('/docs/weeks-3-5/intro', 'cff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-3-5/launch-files',
                component: ComponentCreator('/docs/weeks-3-5/launch-files', '942'),
                exact: true
              },
              {
                path: '/docs/weeks-3-5/nodes-topics-services',
                component: ComponentCreator('/docs/weeks-3-5/nodes-topics-services', '2db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-3-5/ros2-architecture',
                component: ComponentCreator('/docs/weeks-3-5/ros2-architecture', 'ad7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-3-5/ros2-core-concepts',
                component: ComponentCreator('/docs/weeks-3-5/ros2-core-concepts', 'dfd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-6-7/gazebo-environment',
                component: ComponentCreator('/docs/weeks-6-7/gazebo-environment', '71e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-6-7/gazebo-setup',
                component: ComponentCreator('/docs/weeks-6-7/gazebo-setup', '4c6'),
                exact: true
              },
              {
                path: '/docs/weeks-6-7/intro',
                component: ComponentCreator('/docs/weeks-6-7/intro', '4d6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-6-7/physics-simulation',
                component: ComponentCreator('/docs/weeks-6-7/physics-simulation', 'a71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-6-7/robot-description',
                component: ComponentCreator('/docs/weeks-6-7/robot-description', 'd90'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-6-7/unity-simulation',
                component: ComponentCreator('/docs/weeks-6-7/unity-simulation', 'b90'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-6-7/urdf-sdf',
                component: ComponentCreator('/docs/weeks-6-7/urdf-sdf', '39a'),
                exact: true
              },
              {
                path: '/docs/weeks-8-10/intro',
                component: ComponentCreator('/docs/weeks-8-10/intro', '4cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-8-10/isaac-sdk',
                component: ComponentCreator('/docs/weeks-8-10/isaac-sdk', '968'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-8-10/perception-manipulation',
                component: ComponentCreator('/docs/weeks-8-10/perception-manipulation', 'e9f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-8-10/reinforcement-learning',
                component: ComponentCreator('/docs/weeks-8-10/reinforcement-learning', '2fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/weeks-8-10/sim-to-real-transfer',
                component: ComponentCreator('/docs/weeks-8-10/sim-to-real-transfer', '8a2'),
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
