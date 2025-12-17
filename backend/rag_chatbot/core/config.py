from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    # Database settings - Will use PostgreSQL when running in Docker
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:postgres@localhost:5432/rag_chatbot"  # Default for local dev
    )

    # Qdrant settings
    QDRANT_API_KEY: str = os.getenv("QDRANT_API_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.N1r3ub3HO_BxM8OwB5hofC5BrSKk9BueBlLVk4ASQr4")
    QDRANT_HOST: str = os.getenv("QDRANT_HOST", "https://420aeb46-c01e-489c-a0a9-992b22d2b6e0.europe-west3-0.gcp.cloud.qdrant.io")
    QDRANT_PORT: int = os.getenv("QDRANT_PORT", 6333)
    QDRANT_COLLECTION_NAME: str = os.getenv("QDRANT_COLLECTION_NAME", "book_content")

    # Cohere settings
    COHERE_API_KEY: str = os.getenv("COHERE_API_KEY", "6cyHaeTOvVioCZ7hOARJOxSu5VPaNgXGgWKTrUW2")

    # Application settings
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"

    class Config:
        case_sensitive = True


settings = Settings()