# MongoDB replica set
This project contains scripts to create a recplica set in MongoDB without hassle

## Prerequisites
To make this work, you must have Docker and Docker-compose installed on your computer

## Create the replica set
```shell
./dbstart.sh
```

## Connect to the primary docker instance
```shell
docker exec -it mongo1 mongo
```

## Shutdown the replica set
```shell
docker-compose down
```