###################
# BUILD FOR PRODUCTION
###################

FROM node:18 As build

# Set the working directory
WORKDIR /usr/local/app/

# Add the node_modules to the PATH
ENV PATH ./node_modules/.bin:$PATH

# Copy the package.json and package-lock.json to install dependencies
COPY --chown=node:node package*.json ./

# Install all the dependencies
RUN npm ci

# Add the source code to app/frontend
COPY --chown=node:node . .

# Generate the build of the application
RUN npm run build

# Set the environment variables
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM nginx:latest As production

# Copy the build output to replace the default nginx contents.
COPY --chown=node:node --from=build /usr/local/app/build /usr/share/nginx/html
# COPY --chown=node:node --from=build /usr/local/app/build /usr/share/nginx/html

# Copy the local nginx configuration file to the nginx conf.d folder
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY  --chown=node:node nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the package.json and package-lock.json 
COPY --from=build /usr/local/app/package*.json ./
COPY --chown=node:node --from=build /usr/local/app/package*.json ./

# Copy the environment variables
COPY  --from=build /usr/local/app/prod.front.env ./
# COPY --chown=node:node  --from=build /usr/local/app/prod.front.env ./


# Copy the nginx access file
# COPY nginx/.access /etc/nginx/.access
# COPY --chown=node:node nginx/.access /etc/nginx/.access

# Expose port 80
EXPOSE 80

# Expose port 443
# EXPOSE 443 

# Run nginx
CMD ["nginx", "-g", "daemon off;"]