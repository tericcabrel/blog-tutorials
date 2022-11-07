# Spring Boot with MongoDB
This project show how to use MongoDB in a Spring Boot project.

# Installation

- Clone the repository

- Enter the project's directory

- Create a container of MongoDB

```shell
docker run -d --rm --name championship-db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:6.0
```
- Create application.properties file from application-example.properties

- Update application.properties with your own configuration

- install maven dependencies `mvn install`

- run the application `mvn spring-boot:run`

- Test endpoints with Postman or other REST client