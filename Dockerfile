# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm run build
# Copy app source code
COPY . .

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]