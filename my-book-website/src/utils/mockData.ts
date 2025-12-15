import { BookContent, Chapter, Topic } from "../types/global";

export const mockChapters: Chapter[] = [
  {
    id: "weeks-1-2",
    title: "Weeks 1-2: Introduction to Physical AI",
    contentPath: "/docs/weeks-1-2/",
    order: 1,
    topics: [
      {
        id: "weeks-1-2-intro",
        chapterId: "weeks-1-2",
        title: "Introduction to Physical AI",
        order: 1
      },
      {
        id: "weeks-1-2-foundations",
        chapterId: "weeks-1-2",
        title: "Foundations of Physical AI and Embodied Intelligence",
        order: 2
      },
      {
        id: "weeks-1-2-from-digital-ai",
        chapterId: "weeks-1-2",
        title: "From Digital AI to Robots That Understand Physical Laws",
        order: 3
      },
      {
        id: "weeks-1-2-humanoid-landscape",
        chapterId: "weeks-1-2",
        title: "Overview of Humanoid Robotics Landscape",
        order: 4
      },
      {
        id: "weeks-1-2-sensor-systems",
        chapterId: "weeks-1-2",
        title: "Sensor Systems: LIDAR, Cameras, IMUs, Force/Torque Sensors",
        order: 5
      }
    ]
  },
  {
    id: "weeks-3-5",
    title: "Weeks 3-5: ROS 2 Fundamentals",
    contentPath: "/docs/weeks-3-5/",
    order: 2,
    topics: [
      {
        id: "weeks-3-5-intro",
        chapterId: "weeks-3-5",
        title: "ROS 2 Architecture and Core Concepts",
        order: 1
      },
      {
        id: "weeks-3-5-architecture",
        chapterId: "weeks-3-5",
        title: "Nodes, Topics, Services, and Actions",
        order: 2
      },
      {
        id: "weeks-3-5-packages",
        chapterId: "weeks-3-5",
        title: "Building ROS 2 Packages with Python",
        order: 3
      },
      {
        id: "weeks-3-5-concepts",
        chapterId: "weeks-3-5",
        title: "ROS 2 Core Concepts and Design Patterns",
        order: 4
      },
      {
        id: "weeks-3-5-launch",
        chapterId: "weeks-3-5",
        title: "Launch Files and Parameter Management",
        order: 5
      }
    ]
  },
  {
    id: "weeks-6-7",
    title: "Weeks 6-7: Robot Simulation",
    contentPath: "/docs/weeks-6-7/",
    order: 3,
    topics: [
      {
        id: "weeks-6-7-intro",
        chapterId: "weeks-6-7",
        title: "Gazebo Simulation Environment",
        order: 1
      },
      {
        id: "weeks-6-7-gazebo",
        chapterId: "weeks-6-7",
        title: "Gazebo Simulation Environment Setup",
        order: 2
      },
      {
        id: "weeks-6-7-description",
        chapterId: "weeks-6-7",
        title: "Robot Description: URDF and SDF Formats",
        order: 3
      },
      {
        id: "weeks-6-7-physics",
        chapterId: "weeks-6-7",
        title: "Physics Simulation and Sensor Simulation",
        order: 4
      },
      {
        id: "weeks-6-7-unity",
        chapterId: "weeks-6-7",
        title: "Unity for Robot Simulation and Visualization",
        order: 5
      }
    ]
  },
  {
    id: "weeks-8-10",
    title: "Weeks 8-10: NVIDIA Isaac Platform",
    contentPath: "/docs/weeks-8-10/",
    order: 4,
    topics: [
      {
        id: "weeks-8-10-intro",
        chapterId: "weeks-8-10",
        title: "NVIDIA Isaac SDK and Isaac Sim",
        order: 1
      },
      {
        id: "weeks-8-10-sdk",
        chapterId: "weeks-8-10",
        title: "Isaac SDK Components and Architecture",
        order: 2
      },
      {
        id: "weeks-8-10-perception",
        chapterId: "weeks-8-10",
        title: "AI-Powered Perception and Manipulation",
        order: 3
      },
      {
        id: "weeks-8-10-reinforcement",
        chapterId: "weeks-8-10",
        title: "Reinforcement Learning for Robot Control",
        order: 4
      },
      {
        id: "weeks-8-10-transfer",
        chapterId: "weeks-8-10",
        title: "Sim-to-Real Transfer Techniques",
        order: 5
      }
    ]
  },
  {
    id: "weeks-11-12",
    title: "Weeks 11-12: Humanoid Robot Development",
    contentPath: "/docs/weeks-11-12/",
    order: 5,
    topics: [
      {
        id: "weeks-11-12-intro",
        chapterId: "weeks-11-12",
        title: "Humanoid Robot Kinematics and Dynamics",
        order: 1
      },
      {
        id: "weeks-11-12-kinematics",
        chapterId: "weeks-11-12",
        title: "Humanoid Robot Kinematics and Dynamics",
        order: 2
      },
      {
        id: "weeks-11-12-locomotion",
        chapterId: "weeks-11-12",
        title: "Bipedal Locomotion and Balance Control",
        order: 3
      },
      {
        id: "weeks-11-12-manipulation",
        chapterId: "weeks-11-12",
        title: "Manipulation and Grasping with Humanoid Hands",
        order: 4
      },
      {
        id: "weeks-11-12-interaction",
        chapterId: "weeks-11-12",
        title: "Natural Human-Robot Interaction",
        order: 5
      }
    ]
  },
  {
    id: "week-13",
    title: "Week 13: Conversational Robotics",
    contentPath: "/docs/week-13/",
    order: 6,
    topics: [
      {
        id: "week-13-intro",
        chapterId: "week-13",
        title: "GPT Model Integration for Conversational Robotics",
        order: 1
      },
      {
        id: "week-13-gpt",
        chapterId: "week-13",
        title: "GPT Model Integration and Natural Language Processing",
        order: 2
      },
      {
        id: "week-13-speech",
        chapterId: "week-13",
        title: "Speech Recognition and Natural Language Understanding",
        order: 3
      },
      {
        id: "week-13-multi-modal",
        chapterId: "week-13",
        title: "Multi-Modal Interaction: Speech, Gesture, and Vision",
        order: 4
      },
      {
        id: "week-13-design",
        chapterId: "week-13",
        title: "Conversation Design Principles",
        order: 5
      }
    ]
  }
];

export const mockBookContent: BookContent = {
  id: "physical-ai-course",
  title: "Physical AI: The Next Frontier of Embodied Intelligence",
  description: "A comprehensive 13-week course on Physical AI and embodied intelligence",
  author: "Physical AI Expert",
  chapters: mockChapters
};