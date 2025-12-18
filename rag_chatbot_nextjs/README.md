# RAG Chatbot for Docusaurus Book Site

This is a RAG (Retrieval-Augmented Generation) chatbot designed to work with your Docusaurus book website and deployable to Vercel.

## Features

- Responds to questions about your book content
- Uses selected text for focused queries
- Powered by Cohere for embeddings and generation
- Stores vector embeddings in Pinecone for fast retrieval
- Easy deployment to Vercel

## Tech Stack

- Next.js with TypeScript
- Cohere AI for embeddings and generation
- Pinecone for vector storage
- Node.js serverless functions

## Prerequisites

1. **Cohere API Key**: Sign up at [Cohere](https://dashboard.cohere.ai/welcome/register) to get your API key
2. **Pinecone API Key**: Sign up at [Pinecone](https://app.pinecone.io/) to create an index for vector storage

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your API keys:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your actual API keys:

```env
COHERE_API_KEY=your_cohere_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=book-content
```

### 3. Set Up Pinecone Index

1. Log in to your Pinecone dashboard
2. Create a new index with:
   - Name: `book-content` (or whatever you set in `PINECONE_INDEX_NAME`)
   - Dimensions: 1024 (for Cohere's multilingual embeddings) or 1536 (for English model)
   - Metric: Cosine
   - Pods: Starter (free tier)

### 4. Process Your Book Content

To ingest your book content from your Docusaurus site:

```bash
npm run ingest
```

By default, this looks for your content in `../../../my-book-website/docs`, but you can specify a different path:

```bash
npm run ingest /path/to/your/docs
```

### 5. Development

To run the development server:

```bash
npm run dev
```

Your API will be available at `http://localhost:3000/api/chat`

### 6. Integration with Docusaurus

To connect this backend to your existing Docusaurus site, update your chat component to point to:

- Local development: `http://localhost:3000/api/chat`
- Production: `https://your-project.vercel.app/api/chat`

Example fetch call:

```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    question: 'Your question here',
    session_id: 'optional session id',
    selected_text: 'optional selected text for focused queries'
  })
});
```

## Deployment to Vercel

### Option 1: One-click deploy (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo-name)

### Option 2: Manual deployment

1. Install the Vercel CLI:
```bash
npm i -g vercel
```

2. Run the deployment command:
```bash
vercel
```

3. Follow the prompts, and make sure to add your environment variables

### Option 3: Connect GitHub repository to Vercel

1. Push this code to a GitHub repository
2. Go to [Vercel dashboard](https://vercel.com/dashboard)
3. Click "Add New..." → "Project"
4. Import your repository
5. Add the environment variables in the Vercel dashboard (Settings → Environment Variables)
6. Click "Deploy"

## API Endpoints

### POST `/api/chat`

Main chat endpoint that processes questions about your book content.

Request body:
```json
{
  "question": "What is this book about?",
  "session_id": "optional-session-id",
  "selected_text": "optional selected text for focused queries"
}
```

Response:
```json
{
  "response": "Generated answer from the AI",
  "sources": [
    {
      "id": "document-id",
      "content": "Relevant content snippet...",
      "relevance_score": 0.87,
      "metadata": {
        "title": "Chapter Title",
        "chapter": "chapter-name",
        "section": "section-name"
      }
    }
  ],
  "session_id": "session-id",
  "timestamp": "2025-12-17T00:00:00Z"
}
```

## Troubleshooting

### Common Issues

1. **Environment Variables Not Set**: Make sure all required environment variables are set in both local development and in the Vercel dashboard.

2. **Pinecone Index Not Found**: Ensure that your Pinecone index matches exactly what you have in `PINECONE_INDEX_NAME` environment variable.

3. **Dimension Mismatch**: If you get embedding dimension errors, make sure your Pinecone index dimensions match the embeddings from Cohere (1024 for multilingual model, 1536 for English model).

## Architecture

This application consists of:
- Next.js serverless API routes for the backend
- Cohere for natural language processing
- Pinecone for vector storage and retrieval
- Compatible with Vercel's serverless infrastructure

The system processes your book content into chunks, stores vector embeddings in Pinecone, and responds to queries using a RAG approach.