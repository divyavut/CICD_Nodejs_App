# Stage 1: Install dependencies in a separate stage to minimize final image size
FROM node:14 AS build

WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Create a clean image for the app
FROM node:14

WORKDIR /app

# Copy installed dependencies from the build stage
COPY --from=build /app /app

EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
