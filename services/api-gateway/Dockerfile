# Node.js API Gateway Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

RUN npm install --production

# Copy source files
COPY src ./src
COPY .env ./

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]