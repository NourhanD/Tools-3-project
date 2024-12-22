FROM node:18-alpine as build

# Step 1: Build the React app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Set up NGINX
FROM nginx:alpine

# Copy the build output to NGINX's html directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy the custom nginx.conf to NGINX configuration directory
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create writable directories for NGINX
RUN mkdir -p /tmp/nginx-temp/client_body \
    /tmp/nginx-temp/proxy \
    /tmp/nginx-temp/fastcgi \
    /tmp/nginx-temp/uwsgi \
    /tmp/nginx-temp/scgi \
    && chmod -R 777 /tmp/nginx-temp

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
