# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY nuxt/package*.json ./
RUN npm ci

COPY nuxt/ ./
RUN npm run generate

# Production stage
FROM nginx:stable-alpine

COPY --from=builder /app/.output/public /usr/share/nginx/html
COPY infra/nginx_default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]