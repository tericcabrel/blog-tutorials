# SPRING BOOT INPUT VALIDATION

## Prerequisites
* Java 11
* Docker

# Install dependencies
```shell
mvn install
```

# Run MySQL container
```shell
docker run -it -e MYSQL_ROOT_PASSWORD=secretpswd -e MYSQL_DATABASE=hotels --name hotels-mysql -p 3307:3306 mysql:8.0
```

# Run the application
```shell
mvn spring-boot:run
```