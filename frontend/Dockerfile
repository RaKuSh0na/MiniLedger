# Stage 1: Build Angular App
FROM node:20 AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy all source files
COPY . .

# Build the Angular application
RUN npm run build -- --configuration=production

# Verify build succeeded
RUN ls -la /app/dist && \
    (test -d /app/dist/frontend/browser || test -d /app/dist/frontend || test -d /app/dist) || \
    (echo "ERROR: Build output not found!" && exit 1)

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular files
# For @angular/build:application builder (Angular 17+), output is in dist/frontend/browser
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Remove default nginx static files
RUN rm -f /usr/share/nginx/html/50x.html

# Verify files were copied
RUN ls -la /usr/share/nginx/html && \
    test -f /usr/share/nginx/html/index.html || \
    (echo "ERROR: index.html not found!" && exit 1)

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]