#!/bin/bash

# Build the docker image
docker buildx build --load -f Dockerfile . -t 445007777844.dkr.ecr.eu-central-1.amazonaws.com/graffinity-frontend
