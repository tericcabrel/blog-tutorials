# Node RabbitMQ
This project shows how to make a pub-sub between three Node.js 
applications using RabbitMQ.

## Prerequisites
* Node.js 16+
* NPM or Yarn

## Setup
```shell
git clone https://github.com/tericcabrel/blog-tutorials.git

cd blog-tutorials/node-rabbitmq
```

### Set up the producer
```shell
cd app-producer

yarn install

yarn start
```

### Set up the consumer (notification service)
```shell
cd app-consumer

yarn install

yarn start
```

### Set up the consumer (analytic service)
```shell
cd app-consumer-analytic

yarn install

yarn start
```

## Test
Open a HTTP client and send a POST request to [http://localhost:4500/register](http://localhost:4500/register)
with the following body:

```json
{
  "email": "jane.doe@email.com",
  "name": "Jane DOE"
}
```

You will see the output in the console of the two consumers.
