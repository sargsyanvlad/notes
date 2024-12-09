FROM node:20

WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package*.json ./

# Install dependencies

RUN npm install

# Copy the remaining application files (including TypeScript files)
COPY . .

# Build the TypeScript application
RUN npm run build

CMD ["ls", "-la"]
# Run the application
CMD ["node", "dist/main.js"]
