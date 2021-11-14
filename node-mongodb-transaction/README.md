# MongoDB replica set
This project show how to use a transaction in MongoDB using Mongoose

## Prerequisites
To make this work, you must have Docker and Docker-compose installed on your computer.
Node.js 12+ is also required.

## Create the replica set
```shell
./dbstart.sh
```

## Run the code
```shell
yarn start
```

## Connect to the primary docker instance
```shell
docker exec -it mongo1 mongo
```

## Shutdown the replica set
```shell
docker-compose down
```