FROM nginx:alpine

# Install Lua module for Nginx
RUN apk update && apk add --no-cache \
    nginx-mod-http-lua

# Set working directory
WORKDIR /etc/nginx

# Copy Nginx configuration
COPY nginx.conf ./nginx.conf
COPY app.conf ./conf.d/default.conf

# Copy deployment script
COPY deployment.sh ./deployment.sh
RUN chmod +x ./deployment.sh

# Create a directory for the .htpasswd file
RUN mkdir -p ./auth

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]