FROM mhart/alpine-node:16 as builder

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN yarn install

RUN npx esbuild ./src/index.ts --bundle --platform=node --outfile=build/index.js

FROM mhart/alpine-node:16 as app

ENV NODE_ENV=production

RUN mkdir -p /app

WORKDIR /app

COPY --chown=node:node --from=builder /app/build/index.js /app

EXPOSE 4500

ENTRYPOINT ["node", "index.js"]