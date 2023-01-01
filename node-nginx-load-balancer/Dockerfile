FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY src ./src

EXPOSE 4500

CMD ["yarn", "start"]
