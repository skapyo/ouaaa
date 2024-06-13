# build environment
#FROM node:16 as build
FROM node:21.6.0 as build

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Set the build arguments for environment variables
ARG NEXT_PUBLIC_API_URI
ENV NEXT_PUBLIC_API_URI=$NEXT_PUBLIC_API_URI
ARG NEXT_PUBLIC_URI
ENV NEXT_PUBLIC_URI=$NEXT_PUBLIC_URI
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_SEO_DISABLED
ENV NEXT_PUBLIC_SEO_DISABLED=$NEXT_PUBLIC_SEO_DISABLED
ARG NEXT_PUBLIC_HIDE_ACTIVITY
ENV NEXT_PUBLIC_HIDE_ACTIVITY=$NEXT_PUBLIC_HIDE_ACTIVITY

ENV PATH /app/node_modules/.bin:$PATH
# Installing dependencies
COPY package*.json ./
RUN ulimit -a
RUN npm install --max_semi_space_size=1  --max_old_space_size=198   --max_executable_size=148 --legacy-peer-deps

# Copying source files
COPY . ./
ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}
# Building app
RUN npm run build  --max_semi_space_size=1  --max_old_space_size=198   --max_executable_size=148

# Running the app
CMD [ "npm", "start" ]
