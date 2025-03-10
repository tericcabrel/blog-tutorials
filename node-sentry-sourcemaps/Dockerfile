# Build stage
FROM node:22-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn esbuild ./src/index.ts --bundle --minify --platform=node --outfile=build/index.js

# Production stage
FROM node:22-alpine

WORKDIR /app

# Define build argument
ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION}

COPY --from=builder /app/build/index.js ./
COPY package.json yarn.lock ./

EXPOSE 3000

CMD ["node", "index.js"]