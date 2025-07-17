# # client/Dockerfile
# FROM node:20-alpine AS builder

# WORKDIR /app
# COPY . .

# RUN npm install
# RUN npm run build

# # Serve using `serve`
# FROM node:20-alpine

# WORKDIR /app
# RUN npm install -g serve

# COPY --from=builder /app/dist /app/dist

# EXPOSE 5173
# CMD ["serve", "-s", "dist", "-l", "5173"]


FROM node:20-alpine

WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./

# Install ALL dependencies including dev (like Vite)
RUN npm install

# Then copy rest of the files
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
