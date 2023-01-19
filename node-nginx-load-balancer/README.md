# Node Typescript Starter

This project contains a minimal starter for Node.js project with Typescript, ESLint and Prettier already configured

## Prerequisites
- Node.js 16+
- Yarn or NPM

## Installation
- Install dependencies
```bash
yarn install
```
- Start Application
```bash
yarn start
```
The application will be launched by [Nodemon](https://nodemon.com) so it's will restart automatically on file change

## Using Docker
Run the command below to build the Docker image
```shell
docker build -t nodelb-app:latest .
```
Start a container from the Docker image built 
```shell
docker run --rm -d -p 4501:4500 --env MAX_NUMBER=10 --name nodelbapp-1 nodelb-app:latest
```
Tag the Docker image
```shell
docker tag nodelb-app:latest tericcabrel/nodelb-app:latest
```
Push the image in the docker Hub
```shell
docker push tericcabrel/nodelb-app:latest
```