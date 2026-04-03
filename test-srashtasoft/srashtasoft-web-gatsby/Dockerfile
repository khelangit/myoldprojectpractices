# Use an official Node.js runtime as a parent image
FROM node:18
# Set working directory
WORKDIR /app
# Copy dependency files
COPY package*.json ./
# Install dependencies
RUN npm install --legacy-peer-deps
# Copy all other source code
COPY . .
# Environment variable for Strapi API
ENV STRAPI_API_URL=http://strapi-app:1337
# Expose Gatsby's default dev port
EXPOSE 8000
# Start Gatsby in development mode
CMD ["npm", "run", "develop", "--", "-H", "0.0.0.0"]