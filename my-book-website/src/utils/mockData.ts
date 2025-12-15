import { BookContent, Chapter, Topic } from "../types/global";

export const mockChapters: Chapter[] = [
  {
    id: "chapter-1",
    title: "Introduction to AI-Native Development",
    contentPath: "/docs/chapter-1/",
    order: 1,
    topics: [
      {
        id: "topic-1-1",
        chapterId: "chapter-1",
        title: "Defining AI-Native",
        order: 1
      },
      {
        id: "topic-1-2",
        chapterId: "chapter-1",
        title: "AI-Native vs Traditional Development",
        order: 2
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Infrastructure for AI-Native Systems",
    contentPath: "/docs/chapter-2/",
    order: 2,
    topics: [
      {
        id: "topic-2-1",
        chapterId: "chapter-2",
        title: "Modern Cloud Architectures",
        order: 1
      },
      {
        id: "topic-2-2",
        chapterId: "chapter-2",
        title: "Data Pipeline Design",
        order: 2
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Model Development and Deployment",
    contentPath: "/docs/chapter-3/",
    order: 3,
    topics: [
      {
        id: "topic-3-1",
        chapterId: "chapter-3",
        title: "Training and Fine-tuning",
        order: 1
      },
      {
        id: "topic-3-2",
        chapterId: "chapter-3",
        title: "Deployment Strategies",
        order: 2
      }
    ]
  },
  {
    id: "chapter-4",
    title: "AI-Enabled User Interfaces",
    contentPath: "/docs/chapter-4/",
    order: 4,
    topics: [
      {
        id: "topic-4-1",
        chapterId: "chapter-4",
        title: "Adaptive UI Components",
        order: 1
      },
      {
        id: "topic-4-2",
        chapterId: "chapter-4",
        title: "Conversational Interfaces",
        order: 2
      }
    ]
  },
  {
    id: "chapter-5",
    title: "Monitoring and Evolution",
    contentPath: "/docs/chapter-5/",
    order: 5,
    topics: [
      {
        id: "topic-5-1",
        chapterId: "chapter-5",
        title: "Model Performance Tracking",
        order: 1
      },
      {
        id: "topic-5-2",
        chapterId: "chapter-5",
        title: "Adaptive System Updates",
        order: 2
      }
    ]
  }
];

export const mockBookContent: BookContent = {
  id: "ai-native-book",
  title: "AI-Native Driven Development",
  description: "A comprehensive guide to AI-Native development practices",
  author: "AI Development Expert",
  chapters: mockChapters
};