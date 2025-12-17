FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies for PostgreSQL and other packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
        gcc \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Install Python dependencies with retry logic and timeout settings
COPY requirements.txt /app/
RUN pip install --upgrade pip && \
    pip install --no-cache-dir --default-timeout=1000 -r requirements.txt || \
    (sleep 10 && pip install --no-cache-dir --default-timeout=1000 -r requirements.txt)

# Copy project
COPY . /app/

# Expose port
EXPOSE 8000

# Run the application with proper startup
CMD ["python", "start_server.py"]