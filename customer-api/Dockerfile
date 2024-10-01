# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and bun.lockb to leverage Docker cache
COPY package.json ./

# Install dependencies
RUN npm install -g bun
RUN bun install

# Copy the rest of the application code to the working directory
COPY . .

RUN bunx prisma generate --schema prisma/schema.prisma
RUN bunx prisma migrate deploy

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["bun", "run", "src/index.ts"]
