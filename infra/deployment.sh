#!/bin/bash

# Stop and remove existing containers
docker-compose down

# Pull the latest changes from the repository
git pull origin main

# Build the images (including the app service)
docker-compose build

# Start the services
docker-compose up -d

# Clean up unused images and volumes
docker image prune -f
docker volume prune -f