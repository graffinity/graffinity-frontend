# Stage 1: Build the app
# Use official node image as the base image
FROM node:16 as build
ENV NODE_ENV production

LABEL version="0.4.0"
LABEL description="Graffinity Frontend Dockerfile"
# LABEL maintainer = ["abc@gmail.com", "anc@gmail.com"]

# Set the working directory
WORKDIR /usr/local/app/frontend/

# Add the source code to app/frontend
COPY ./ /usr/local/app/frontend/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/frontend/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY nginx/.access /etc/nginx/.access

# Expose port 80 & 443
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]