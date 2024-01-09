#!/bin/bash

# Define the Docker image name
IMAGE_NAME="cpp-exec-env"

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

if [ $? -ne 0 ]; then
    echo "Failed to build Docker image."
    exit 1
fi

CURRENT_DIR=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

# Run the Docker container
echo "Running Docker container..."
docker run -it --rm -v "$CURRENT_DIR":/usr/src/app $IMAGE_NAME
