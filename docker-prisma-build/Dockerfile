FROM node:20-bullseye as builder

RUN mkdir app

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn prisma generate

RUN yarn tsc


FROM node:20-alpine as engine-builder

WORKDIR /app

COPY --chown=node:node --from=builder /app/prisma/schema.prisma ./app/prisma/

RUN npx prisma generate --schema=./app/prisma/schema.prisma


FROM node:20-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --chown=node:node --from=builder /app/package.json .

COPY --chown=node:node --from=builder /app/build .

RUN yarn install --production && yarn cache clean --all

COPY --chown=node:node --from=engine-builder  /app/node_modules/.prisma/client ./node_modules/.prisma/client

EXPOSE 4500

CMD ["node", "src/index.js"]
