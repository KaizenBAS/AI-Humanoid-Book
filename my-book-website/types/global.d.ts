// Global type definitions for the AI-Native Book Website

export interface BookContent {
  id: string;
  title: string;
  description: string;
  author: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
  contentPath: string;
  order: number;
}

export interface Topic {
  id: string;
  chapterId: string;
  title: string;
  order: number;
}

export interface WaitlistSignup {
  id: string;
  email: string;
  timestamp: string;
  status: 'active' | 'pending';
}

export interface ReadingProgress {
  userId: string;
  chapterId: string;
  topicId: string;
  progressPercentage: number;
  lastReadDate: string;
}

export interface ThemeSettings {
  userId: string;
  theme: 'light' | 'dark';
  lastUpdated: string;
}