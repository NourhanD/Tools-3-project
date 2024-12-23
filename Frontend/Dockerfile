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

# Stage 2: Setup NGINX to serve the built files
FROM nginx:alpine

# Switch to root user to configure permissions
USER root

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create necessary directories with correct permissions
RUN mkdir -p /var/cache/nginx/client_temp \
    /var/cache/nginx/proxy_temp \
    /var/cache/nginx/fastcgi_temp \
    /tmp/nginx/client_body && \
    chown -R nginx:nginx /var/cache/nginx /tmp/nginx

# Copy built React app from the build stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 8080 to avoid permission issues
EXPOSE 8080

# Switch to non-root user for security
USER nginx

# Run NGINX as the entrypoint
CMD ["nginx", "-g", "daemon off;"]
