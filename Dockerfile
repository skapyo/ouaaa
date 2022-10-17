# build environment
FROM node:18.11.0-alpine as build

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . ./

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]