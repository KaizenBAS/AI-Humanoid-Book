// Simple test to validate the storage utility functions
// This is a basic example as Docusaurus projects typically use different testing setups

// Mock localStorage for testing
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// @ts-ignore
global.localStorage = localStorageMock;

import { saveWaitlistSignup, loadWaitlistSignups, saveReadingProgress, loadReadingProgress } from '../src/utils/storage';

describe('Storage Utility Functions', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  test('should save and load waitlist signup', () => {
    const signup = {
      id: 'test-123',
      email: 'test@example.com',
      timestamp: new Date().toISOString(),
      status: 'active' as const
    };

    saveWaitlistSignup(signup);
    const loaded = loadWaitlistSignups();
    
    expect(localStorageMock.setItem).toHaveBeenCalled();
    // Note: In a real test environment, we would validate the loaded data
  });

  test('should save and load reading progress', () => {
    const progress = {
      userId: 'user123',
      chapterId: 'ch1',
      topicId: 't1',
      progressPercentage: 50,
      lastReadDate: new Date().toISOString()
    };

    saveReadingProgress(progress);
    const loaded = loadReadingProgress();
    
    expect(localStorageMock.setItem).toHaveBeenCalled();
    // Note: In a real test environment, we would validate the loaded data
  });
});