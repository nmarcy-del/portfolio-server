# Dockerfile
FROM node:18.15-alpine3.16

# Create a directory to hold application
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Copy the .env file
COPY .env ./

# Install your project dependencies
RUN npm ci

# Copy the rest of your application
COPY . .

# Expose the port on which your Node.js server will listen
EXPOSE 4000

# Start your Node.js server
CMD [ "node", "app.js" ]