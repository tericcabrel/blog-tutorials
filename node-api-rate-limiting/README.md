# Node Rest API with Swagger

This project is a REST API with all the endpoints documented built with Node.js and Express.

## Prerequisites
- Node.js 10+
- Yarn or NPM
- Docker

## Start a Docker container of MongoDB
```shell
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=secret --name mongodb mongo:5.0
```

## Installation
- Install dependencies
```bash
yarn install
```
- Create local environment file
```shell
cp .env.example .env
nano .env
```
- Start Application
```bash
yarn start
```
The application will be launched by [Nodemon](https://nodemon.com) so it's will restart automatically on file change
