# Use the official Node.js 20.11.1 image with Alpine Linux as base
FROM node:20.11.1-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your app runs
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]