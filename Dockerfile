# build environment
FROM node:13.12.0-alpine as build

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
# Installing dependencies
COPY package*.json ./
RUN npm install --force

# Copying source files
COPY . ./
ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}
# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]