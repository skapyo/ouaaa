# build environment
FROM node:16 as build

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
# Installing dependencies
COPY package*.json ./

RUN npm install --max_semi_space_size=1  --max_old_space_size=198   --max_executable_size=148 --force

# Copying source files
COPY . ./
ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}

# Building app
RUN npm run build  --max_semi_space_size=1  --max_old_space_size=198   --max_executable_size=148

# Running the app
CMD [ "npm", "start" ]
