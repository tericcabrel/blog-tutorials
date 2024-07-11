# Bookstore API

This project demonstrate how to use the PlanetScale serverless driver for JavaScript to connect to a PlanetScale database from an AWS Lambda function.

## Prerequisites
You have an AWS account to deploy the serverless API; a [free tier](https://aws.amazon.com/free/) is enough.
You have a [PlanetScale account](https://planetscale.com/).
AWS CLI configured; check out [my blog post](https://blog.tericcabrel.com/install-aws-cli-v2/) to see how to do it.
Node.js 20.6+ is installed on your computer, or you can [download it](https://nodejs.org/en/download).
Docker is installed on your computer for the [Prisma shadow database](https://blog.tericcabrel.com/understand-the-shadow-database-feature-prisma/).
The PlanetScale CLI installed on your computer, checkout the [installation guide](https://github.com/planetscale/cli#installation).

## Set up the project

Install the Node.js dependencies
```shell
yarn install
```

Create an instance of the shadow database
```shell
yarn db:shadow
```

Create a tunnel from the local computer to the remote PlanetScale database branch
```shell
pscale connect <database> <branch>
```
Replace `<database>` and `<branch>` with your PlanetScale database and the branch you created.

Copy the `.env.example` file to `.env` and fill in the required values `DATABASE_URL`, `SHADOW_DATABASE_URL`, `DATABASE_HOST`, `DATABASE_USERNAME` and `DATABASE_PASSWORD`.

```shell
cp .env.example .env
```

Execute the database migration
```shell
yarn prisma migrate dev
```

Synthesize the AWS CDK stack
```shell
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws
yarn synth
```

Bootstrap the CDK environment
```shell
yarn bootstrap
```

Deploy the AWS CDK stack
```shell
yarn deploy
```
The API gateway URL will be displayed in the output of the command.

## Test the API locally

Start the local server
```shell
yarn gateway
```
The API will start on port 3000.

### Add a book
```shell
curl --location 'http://127.0.0.1:3000/books' \
--header 'Content-Type: application/json' \
--data '{
    "isbn": "978-0132350884",
    "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "summary": "Even bad code can function. But if code isn'\''t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code.",
    "publishDate": "2008-08-11",
    "priceCents": 2999,
    "priceCurrency": "USD",
    "isAvailable": true,
    "pages": 464,
    "author": "Robert C. Martin",
    "publisher": "Prentice Hall"
}'
```

### Get all books
```shell
curl --location 'http://127.0.0.1:3000/books'
```

### Update a book
```shell
curl --location --request PATCH 'http://127.0.0.1:3000/books/:id' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Clean Code",
    "summary": "Every year, countless hours and significant resources are lost because of poorly written code.",
    "priceCents": 2875,
    "isAvailable": false
}'
```

### Delete a book
```shell
curl --location --request DELETE 'http://127.0.0.1:3000/books/:id'
```

## Destroy the AWS stack
```shell
yarn destroy
```