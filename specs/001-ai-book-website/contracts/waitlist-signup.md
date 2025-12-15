# API Contract: Waitlist Signup

**Feature**: AI-Native Book Website
**Date**: 2025-12-15
**Branch**: 001-ai-book-website

## Endpoint

`POST /api/waitlist`

## Purpose

Allows users to sign up for the book content waitlist.

## Request

### Headers
```
Content-Type: application/json
```

### Body
```json
{
  "email": "user@example.com"
}
```

## Response

### Success (200 OK)
```json
{
  "success": true,
  "message": "Successfully added to waitlist"
}
```

### Validation Error (400 Bad Request)
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

### Server Error (500 Internal Server Error)
```json
{
  "success": false,
  "error": "Failed to save to waitlist"
}
```

## Business Rules

1. Email must be in a valid format
2. Duplicate emails are allowed (no deduplication in MVP)
3. No authentication required for signup