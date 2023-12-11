# Node YouTube API authentication

This project contains a minimal starter for Node.js project with Typescript, ESLint and Prettier

## Prerequisites
- Node.js 18+
- Yarn or NPM

## Installation
- Install dependencies
```bash
yarn install
```

- Create local environment file, then set the Client ID and the client secret
```shell
cp .env.example .env

nano .env
```

- Generate the access token
```bash
yarn start
```
The application is launched by [Nodemon,](https://nodemon.com) which automatically restart the application on file change.
