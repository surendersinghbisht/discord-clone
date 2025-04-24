# Dockerfile for Node.js backend
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json from backend and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy the backend source code into the container
COPY backend/ .

# Expose the port your app will run on (adjust to your actual port if needed)
EXPOSE 5000

# Run the app using npm start
CMD ["npm", "start"]
