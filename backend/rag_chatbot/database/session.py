from sqlalchemy.orm import Session
from .base import SessionLocal


def get_db() -> Session:
    """
    Dependency function that yields database sessions.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()