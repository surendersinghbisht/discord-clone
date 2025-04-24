# Dockerfile for Node.js backend
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY backend/ .

# Expose the port your app is running on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
