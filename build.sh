#!/bin/bash

# Build the docker image
docker build -t 445007777844.dkr.ecr.eu-central-1.amazonaws.com/graffinity-frontend:amd64 --platform linux/amd64 .