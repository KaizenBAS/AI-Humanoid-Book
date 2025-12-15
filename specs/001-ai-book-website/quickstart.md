# Quickstart Guide: AI-Native Book Website

**Feature**: AI-Native Book Website
**Date**: 2025-12-15
**Branch**: 001-ai-book-website

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-book-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root with any required environment variables (if applicable):
   ```env
   # Example environment variables
   CUSTOM_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run start
   # or
   yarn start
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application

## Project Structure Overview

```
my-book-website/          # Project root
├── src/                  # Source files
│   ├── components/       # Reusable React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── theme/        # Theme provider and toggle
│   │   ├── navigation/   # Navigation elements
│   │   └── mdx/          # MDX components
│   ├── pages/            # Additional pages (about, contact)
│   │   ├── about.tsx     # About page (author bio + vision)
│   │   └── contact.tsx   # Contact page (waitlist form)
│   ├── css/              # Custom styles
│   │   └── custom.css    # Global styles and theme
│   └── theme/            # Custom theme components
├── docs/                 # Book content in Docusaurus format
│   ├── intro.mdx         # Introduction page
│   ├── chapter-1/        # Chapter 1 with 2 topics
│   │   ├── index.mdx     # Chapter 1 intro
│   │   ├── topic-1.mdx   # Chapter 1, Topic 1
│   │   └── topic-2.mdx   # Chapter 1, Topic 2
│   ├── chapter-2/        # Chapter 2 with 2 topics
│   │   ├── index.mdx     # Chapter 2 intro
│   │   ├── topic-1.mdx   # Chapter 2, Topic 1
│   │   └── topic-2.mdx   # Chapter 2, Topic 2
│   ├── chapter-3/        # Chapter 3 with 2 topics
│   │   ├── index.mdx     # Chapter 3 intro
│   │   ├── topic-1.mdx   # Chapter 3, Topic 1
│   │   └── topic-2.mdx   # Chapter 3, Topic 2
│   ├── chapter-4/        # Chapter 4 with 2 topics
│   │   ├── index.mdx     # Chapter 4 intro
│   │   ├── topic-1.mdx   # Chapter 4, Topic 1
│   │   └── topic-2.mdx   # Chapter 4, Topic 2
│   └── chapter-5/        # Chapter 5 with 2 topics
│       ├── index.mdx     # Chapter 5 intro
│       ├── topic-1.mdx   # Chapter 5, Topic 1
│       └── topic-2.mdx   # Chapter 5, Topic 2
├── static/               # Static assets
│   ├── img/              # Images and graphics
│   └── icons/            # Icon files
├── docusaurus.config.js  # Docusaurus configuration
├── sidebars.js           # Navigation sidebar configuration
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
├── README.md             # Project documentation
└── docs/                 # Additional documentation
    └── development.md    # Development workflow
```

## Key Commands

- `npm run start` - Start development server with hot reloading
- `npm run build` - Build the application for production
- `npm run serve` - Serve the production build locally
- `npm run deploy` - Deploy to configured platform
- `npm test` - Run tests (if implemented)

## Running Tests

If tests have been implemented:

```bash
npm test          # Run all tests
npm test -- --watch  # Run tests in watch mode
```

## Adding New Content

To add new book content:

1. Create a new MDX file in the `docs/chapter-{number}/` directory
2. Follow the naming convention `topic-{number}.mdx`
3. Update `sidebars.js` to include the new content in the navigation
4. Use appropriate MDX syntax to format your content

## Environment Variables

This project uses the following environment variables:

- `CUSTOM_SITE_URL` - The public URL of the site (used for metadata and links)

## Troubleshooting

### Common Issues

1. **Module not found errors**: Run `npm install` to ensure all dependencies are installed

2. **Port already in use**: The server runs on port 3000 by default; try terminating other processes using this port

3. **MDX content not rendering**: Ensure MDX files are in the correct directory and have valid syntax

### Performance Tips

- For optimal performance, keep images optimized
- Monitor bundle size with `npm run build` to ensure it stays under 150KB as per requirements
- Test on mobile devices to ensure responsive design works correctly
- Leverage Docusaurus' built-in performance optimizations