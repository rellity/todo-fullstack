# Use official Node.js image
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy app files and build
COPY . .
RUN npx prisma generate
RUN npm run build

# Run the production server
CMD ["npm", "start"]
