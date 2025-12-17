import time
import subprocess
import sys
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
from core.config import settings

def wait_for_db(max_attempts=30, delay=2):
    """Wait for the database to be ready."""
    print("Waiting for database to be ready...")
    
    # Using the database URL from settings
    engine = create_engine(settings.DATABASE_URL)
    
    for attempt in range(max_attempts):
        try:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
                print("Database is ready!")
                return True
        except OperationalError as e:
            print(f"Attempt {attempt + 1}: Database not ready - {e}")
            time.sleep(delay)
    
    print("Database was not ready in time")
    return False

def run_db_migrations():
    """Run database setup/migrations."""
    try:
        print("Setting up database tables...")
        from database.base import engine, Base
        Base.metadata.create_all(bind=engine)
        print("Database setup completed!")
    except Exception as e:
        print(f"Error during database setup: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Wait for database
    if not wait_for_db():
        print("Failed to connect to database after several attempts")
        sys.exit(1)
    
    # Run database migrations
    run_db_migrations()
    
    print("Starting the application...")
    # Start the main application
    subprocess.run([sys.executable, "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"])