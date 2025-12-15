// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Weeks 1-2: Introduction to Physical AI',
      items: ['weeks-1-2/intro', 'weeks-1-2/foundations', 'weeks-1-2/from-digital-ai', 'weeks-1-2/humanoid-landscape', 'weeks-1-2/sensor-systems'],
    },
    {
      type: 'category',
      label: 'Weeks 3-5: ROS 2 Fundamentals',
      items: ['weeks-3-5/intro', 'weeks-3-5/ros2-architecture', 'weeks-3-5/nodes-topics-services', 'weeks-3-5/building-packages', 'weeks-3-5/ros2-core-concepts'],
    },
    {
      type: 'category',
      label: 'Weeks 6-7: Robot Simulation',
      items: ['weeks-6-7/intro', 'weeks-6-7/gazebo-environment', 'weeks-6-7/robot-description', 'weeks-6-7/physics-simulation', 'weeks-6-7/unity-simulation'],
    },
    {
      type: 'category',
      label: 'Weeks 8-10: NVIDIA Isaac Platform',
      items: ['weeks-8-10/intro', 'weeks-8-10/isaac-sdk', 'weeks-8-10/perception-manipulation', 'weeks-8-10/reinforcement-learning', 'weeks-8-10/sim-to-real-transfer'],
    },
    {
      type: 'category',
      label: 'Weeks 11-12: Humanoid Robot Development',
      items: ['weeks-11-12/intro', 'weeks-11-12/kinematics-dynamics', 'weeks-11-12/bipedal-locomotion', 'weeks-11-12/manipulation-grasping', 'weeks-11-12/human-robot-interaction'],
    },
    {
      type: 'category',
      label: 'Week 13: Conversational Robotics',
      items: ['week-13/intro', 'week-13/gpt-integration', 'week-13/speech-recognition', 'week-13/multi-modal-interaction', 'week-13/conversation-design'],
    }
  ],
};

export default sidebars;