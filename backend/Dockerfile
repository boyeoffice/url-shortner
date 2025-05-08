# Build stage
FROM node:23 AS builder
WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/tsconfig.json ./
COPY backend/src ./src
RUN npm run build

# Production image
FROM node:23-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 6000
CMD ["node", "dist/server.js"]
