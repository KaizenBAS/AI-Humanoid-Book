# AI-Native Driven Development Book

A comprehensive guide to AI-Native development practices built with Docusaurus.

## About This Project

This book explores the fundamental concepts, architectural patterns, and practical implementations that define AI-native applications. We cover everything from infrastructure and model development to deployment and monitoring.

## Features

- 5 comprehensive chapters with 10 detailed topics
- Premium reading experience with glassmorphism design
- Responsive layout optimized for all devices
- Reading progress tracking
- Chapter navigation
- Dark/light mode support
- Waitlist signup functionality

## Tech Stack

- [Docusaurus](https://docusaurus.io/) - Static site generator
- [React](https://reactjs.org/) - Component library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [MDX](https://mdxjs.com/) - Content with components

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build
```

## Contributing

This project follows a document-driven development approach. All content is written in MDX format in the `docs/` directory.

## Accessibility

This website follows WCAG 2.1 AA guidelines with:
- Sufficient color contrast ratios
- Semantic HTML structure
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader compatibility

## Deployment

This site is configured for deployment to Vercel, but can also be hosted on any static hosting service.

### Vercel Configuration

The site includes a `vercel.json` configuration file that optimizes performance and caching:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/docs",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    }
  ]
}
```