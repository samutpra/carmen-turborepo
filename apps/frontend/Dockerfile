# Use an official Node runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3500

# Start the application
CMD ["npm", "start"]