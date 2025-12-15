# Data Model: AI-Native Book Website

**Feature**: AI-Native Book Website
**Date**: 2025-12-15
**Branch**: 001-ai-book-website

## Entities

### Book Content
- **ID**: Unique identifier for the book
- **Title**: "AI-Native Driven Development"
- **Description**: A comprehensive guide to AI-Native development practices
- **Author**: Author name and bio information
- **Chapters**: Array of chapter objects (exactly 5 chapters as per requirements)

### Chapter
- **ID**: Unique identifier for the chapter (1-5)
- **Title**: Title of the chapter
- **Topics**: Array of topic objects (exactly 2 topics per chapter)
- **ContentPath**: Path to the MDX file for this chapter
- **Order**: Position in the book sequence (1-5)

### Topic
- **ID**: Unique identifier for the topic
- **ChapterID**: Reference to the parent chapter
- **Title**: Title of the topic
- **Order**: Position within the chapter (1-2)

### Waitlist Signup
- **ID**: Unique identifier for the signup
- **Email**: User-provided email address
- **Timestamp**: When the signup occurred
- **Status**: Active/Pending

### Reading Progress
- **UserID**: Anonymized identifier (likely based on browser fingerprint or localStorage key)
- **ChapterID**: Reference to the chapter being read
- **TopicID**: Reference to the specific topic being read
- **ProgressPercentage**: Percentage of the current topic completed
- **LastReadDate**: Timestamp of the last reading session

### Theme Settings
- **UserID**: User identifier
- **Theme**: 'light' or 'dark'
- **LastUpdated**: Timestamp of the last theme change

## Relationships

- Book Content contains multiple Chapters
- Each Chapter contains multiple Topics
- Reading Progress is associated with a specific User and Topic
- Waitlist Signup contains User information

## Validation Rules

### Chapter
- Must have exactly 5 chapters as specified in the constitution
- Each chapter must have exactly 2 topics
- Title must not be empty

### Topic
- Each topic must belong to exactly one chapter
- Title must not be empty

### Waitlist Signup
- Email must be a valid email format
- Email must not be empty

### Reading Progress
- ProgressPercentage must be between 0 and 100
- ChapterID and TopicID must correspond to existing entities