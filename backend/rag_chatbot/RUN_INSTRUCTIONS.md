# RAG Chatbot Deployment Scripts

## Prerequisites

1. Install Docker Desktop (Windows/Mac) or Docker Engine (Linux)
2. Ensure you have access to the internet to pull required images
3. Make sure no other services are running on ports 8000 and 5432

## Quick Start

To start the entire system:

```bash
docker-compose up --build
```

This will:
- Build the backend service with all dependencies
- Start a PostgreSQL database
- Run the backend API at http://localhost:8000
- Automatically set up the database schema

## Alternative: Run without building (if using pre-built images)

If you prefer to use pre-built images instead of building locally:

1. Update docker-compose.yml to use pre-built images
2. Run: `docker-compose up`

## Accessing the Services

- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Database: Running internally, accessible on port 5432 within the Docker network

## Running the Content Ingestion

After the services are running, you can ingest your book content by running:

```bash
docker-compose exec backend python ingest_content.py
```

## Stopping the System

```bash
docker-compose down
```

To stop and remove volumes (will lose database data):
```bash
docker-compose down -v
```

## Environment Variables

The system is configured with the following default environment variables in docker-compose.yml:
- Qdrant API key and host (configured for your account)
- Cohere API key
- PostgreSQL connection details

To use different values, update the environment variables in docker-compose.yml

## Troubleshooting

1. If you get port conflicts, make sure no other applications are using ports 8000 or 5432
2. If the build fails, ensure Docker has enough resources allocated
3. If the database doesn't start, check Docker logs with `docker-compose logs db`
4. If the backend fails to connect to the database, it might need more time - check with `docker-compose logs backend`