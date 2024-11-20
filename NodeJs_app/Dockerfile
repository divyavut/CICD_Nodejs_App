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

# Copy only node_modules from the build stage (avoiding unnecessary files)
COPY --from=build /app/node_modules /app/node_modules

# Copy the rest of the application code
COPY --from=build /app /app

EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
