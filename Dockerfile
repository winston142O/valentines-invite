# Use Node.js as the first stage (Build Stage)
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Accept environment variables as build arguments
ARG VITE_REACT_APP_PLACE_URL
ARG VITE_REACT_APP_FIRST_MESSAGE
ARG VITE_REACT_APP_SECOND_MESSAGE
ARG VITE_REACT_APP_THIRD_MESSAGE
ARG VITE_REACT_APP_FOURTH_MESSAGE
ARG VITE_REACT_APP_DATE_DAY
ARG VITE_REACT_APP_DATE_TIME

# Export them as environment variables for the build
ENV VITE_REACT_APP_PLACE_URL=$VITE_REACT_APP_PLACE_URL
ENV VITE_REACT_APP_FIRST_MESSAGE=$VITE_REACT_APP_FIRST_MESSAGE
ENV VITE_REACT_APP_SECOND_MESSAGE=$VITE_REACT_APP_SECOND_MESSAGE
ENV VITE_REACT_APP_THIRD_MESSAGE=$VITE_REACT_APP_THIRD_MESSAGE
ENV VITE_REACT_APP_FOURTH_MESSAGE=$VITE_REACT_APP_FOURTH_MESSAGE
ENV VITE_REACT_APP_DATE_DAY=$VITE_REACT_APP_DATE_DAY
ENV VITE_REACT_APP_DATE_TIME=$VITE_REACT_APP_DATE_TIME

# **Ensure that the build script runs successfully**
RUN npm run build

# Use Nginx as the second stage (Final Image)
FROM nginx:alpine

# Copy built files to Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to serve the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
