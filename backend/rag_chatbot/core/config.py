from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    # Database settings - Will use PostgreSQL when running in Docker
    DATABASE_URL: str = os.getenv("DATABASE_URL")

    # Qdrant settings
    QDRANT_API_KEY: str = os.getenv("QDRANT_API_KEY")  # Required environment variable
    QDRANT_HOST: str = os.getenv("QDRANT_HOST")        # Required environment variable
    QDRANT_PORT: int = os.getenv("QDRANT_PORT", 6333)
    QDRANT_COLLECTION_NAME: str = os.getenv("QDRANT_COLLECTION_NAME", "book_content")

    # Cohere settings
    COHERE_API_KEY: str = os.getenv("COHERE_API_KEY")  # Required environment variable

    # Application settings
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"

    class Config:
        case_sensitive = True


settings = Settings()