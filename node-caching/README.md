# Spring Boot Caching

This project demonstrates the use of caching with REdis to speed the request response

## Prerequisites
- Node.js 12+
- Yarn or NPM

## Start a Docker container for MySQL
```shell
docker run -d -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=product-inventory --name mysqldb -p 3307:3306 mysql:8.0
```
To stop the docker container, run the command `docker stop mysqldb && docker container prune -f`


## Installation
- Install dependencies
```bash
yarn install
```

Create configuration file from the template
```shell
cp .env.template .env

# Edit configuration to match your local environment and save
nano .env
```

- Start Application
```bash
yarn start
```
The application will start on port **8030**

## Endpoints

| Endpoint         | Method | Parameters                                                  |
|------------------|--------|-------------------------------------------------------------|
| /categories      | GET    | Retrieve all categories                                     |
| /products        | GET    | Retrieve all products                                       |
| /products/search | GET    | Search products by name, category, price and availability   |
| /products        | POST   | Add a new product                                           |

## Postman collection
I prepared a Postman collection with all the requests above. You can download, import and test the application without hassle
[Check out the collection](https://www.getpostman.com/collections/f7a3a84434a3660baa8f)
