FROM node:18

WORKDIR /app

# Copy only package files first for better caching
COPY package.json ./

# Install libvips for sharp
RUN apt-get update && apt-get install -y libvips

RUN npm install --legacy-peer-deps

# Copy all other source code
COPY . .

# Ensure strapi binary is executable (move this after COPY . .)
RUN chmod +x node_modules/.bin/strapi

# Build the project
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
