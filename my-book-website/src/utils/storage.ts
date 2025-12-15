// Utility functions for localStorage management

const STORAGE_PREFIX = 'ai-native-book';

export interface ReadingProgress {
  chapterId: string;
  topicId: string;
  progressPercentage: number;
  lastReadDate: string;
}

export interface WaitlistSignup {
  id: string;
  email: string;
  timestamp: string;
  status: 'active' | 'pending';
}

export interface ThemeSetting {
  userId: string;
  theme: 'light' | 'dark';
  lastUpdated: string;
}

// Reading Progress functions
export const saveReadingProgress = (progress: ReadingProgress): void => {
  try {
    const key = `${STORAGE_PREFIX}-reading-progress`;
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving reading progress:', error);
  }
};

export const loadReadingProgress = (): ReadingProgress | null => {
  try {
    const key = `${STORAGE_PREFIX}-reading-progress`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading reading progress:', error);
    return null;
  }
};

// Waitlist functions
export const saveWaitlistSignup = (signup: WaitlistSignup): void => {
  try {
    const key = `${STORAGE_PREFIX}-waitlist`;
    const existing = loadWaitlistSignups();
    const updated = [...existing, signup];
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving waitlist signup:', error);
  }
};

export const loadWaitlistSignups = (): WaitlistSignup[] => {
  try {
    const key = `${STORAGE_PREFIX}-waitlist`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading waitlist signups:', error);
    return [];
  }
};

// Theme functions
export const saveThemeSetting = (setting: ThemeSetting): void => {
  try {
    const key = `${STORAGE_PREFIX}-theme`;
    localStorage.setItem(key, JSON.stringify(setting));
  } catch (error) {
    console.error('Error saving theme setting:', error);
  }
};

export const loadThemeSetting = (): ThemeSetting | null => {
  try {
    const key = `${STORAGE_PREFIX}-theme`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading theme setting:', error);
    return null;
  }
};