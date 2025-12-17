# RAG Chatbot Backend

This is the backend service for the Retrieval-Augmented Generation (RAG) chatbot that integrates with the book website.

## Overview

The backend provides:
- FastAPI-based REST API for chat interactions
- Integration with Cohere for embeddings and text generation
- Qdrant vector database for storing book content embeddings
- PostgreSQL database for chat history
- Content ingestion pipeline for book content

## Architecture

- `main.py`: FastAPI application entry point
- `api/v1/`: API routes and models
- `services/`: Business logic (RAG service, vector store)
- `models/`: Database models
- `database/`: Database connections and session management
- `core/`: Configuration and settings
- `utils/`: Utility functions
- `ingest_content.py`: Script to ingest book content

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables (copy `.env.example` to `.env` and update values):
   ```bash
   cp .env.example .env
   ```

3. Run the content ingestion script:
   ```bash
   python ingest_content.py
   ```

4. Start the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

## API Endpoints

- `POST /api/v1/chat/query` - Main chat endpoint
- `POST /api/v1/admin/embed` - Admin endpoint to embed new documents

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `QDRANT_API_KEY`: Qdrant Cloud API key
- `QDRANT_HOST`: Qdrant Cloud cluster endpoint
- `QDRANT_PORT`: Qdrant port
- `QDRANT_COLLECTION_NAME`: Name of the collection to store embeddings
- `COHERE_API_KEY`: Cohere API key
- `DEBUG`: Whether to run in debug mode

## Deployment

To run in production, use a WSGI/ASGI server like uvicorn with gunicorn:

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```