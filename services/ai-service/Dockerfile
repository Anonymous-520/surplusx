# Python AI Service Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY package.json ./

RUN npm install

# Copy source files
COPY src ./src
COPY main.py ./

EXPOSE 3007

CMD ["npm", "start"]