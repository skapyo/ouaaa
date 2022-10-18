# build environment
FROM node:13.12.0-alpine as build

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app
ARG MAX_OLD_SPACE_SIZE=4096
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}
ENV PATH /app/node_modules/.bin:$PATH
# Installing dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copying source files
COPY . ./

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]