# build environment
FROM node:14.5.0 as build

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
# Installing dependencies
COPY package*.json ./
RUN npm install --max_semi_space_size=1  --max_old_space_size=198   --max_executable_size=148

# Copying source files
COPY . ./

# Building app
RUN npm run build  --max_semi_space_size=1  --max_old_space_size=198   --max_executable_size=148

# Running the app
CMD [ "npm", "start" ]