#!/bin/bash

# Stop and remove any existing containers
docker-compose down

# Build the images
docker-compose build

# Start the containers
docker-compose up -d

# cd frontend
# yarn
# yarn dev