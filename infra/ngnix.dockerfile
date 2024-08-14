FROM nginx:latest

# Install necessary tools and Lua module
RUN apt-get update && apt-get install -y \
    curl \
    git \
    docker.io \
    apache2-utils \
    libnginx-mod-http-lua \
    && rm -rf /var/lib/apt/lists/*

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