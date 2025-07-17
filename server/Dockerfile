# ------------ Builder Stage ------------
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm cache clean --force && \
    npm install --retry 10 --retry-delay 5

# Copy Prisma schema and generate the client
COPY prisma ./prisma
RUN npx prisma generate

# Copy rest of the source
COPY . .
RUN npm run build

# ------------ Production Stage ------------
FROM node:18-alpine

WORKDIR /app

# Copy the built code and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# ✅ Copy generated Prisma client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

EXPOSE 5000
CMD ["node", "dist/server.js"]
