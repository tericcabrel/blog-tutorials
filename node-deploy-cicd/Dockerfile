FROM node:20-alpine AS builder

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN yarn install

RUN npx esbuild ./src/index.ts --bundle --platform=node --outfile=build/index.js

FROM node:20-alpine AS app

ENV NODE_ENV=production

RUN mkdir -p /app

WORKDIR /app

COPY --chown=node:node --from=builder /app/build/index.js /app

EXPOSE 4500

ENTRYPOINT ["node", "index.js"]