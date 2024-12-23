# Stage 1: Build React application
FROM node:18-alpine as build

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve React application using a lightweight Node.js server
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install a simple HTTP server (e.g., serve)
RUN npm install -g serve

# Copy the built React application from the build stage
COPY --from=build /usr/src/app/build .

# Expose port 3000
EXPOSE 3000

# Start the React app
CMD ["serve", "-s", ".", "-l", "3000"]
