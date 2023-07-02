# Lambda Node Rest API

This project shows how to build a REST API on AWS with an API Gateway and Lambda functions.
it uses the AWS CDK to write the infrastructure as code.


## Prerequisites
* An AWS account, a free tier is enough
* AWS CLI configured
* A free MongoDB cluster on MongoDB Atlas
* Node.js 18+
* Docker for building the Lambda function code, optional if you test on AWS directly.

## Setup
Install the Node.js dependencies

```shell
npm install
```
Create the environment variables file from the template
```shell
cp .env.example .env
```
Open the file `.env` and configure the database URL

Bootstrap the CDK
```shell
cdk bootstrap
```

Authenticate to the AWS public ECR
```shell
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws
```
Synthesize the CDK stack
```shell
npm run synth
```

Start the API Gateway locally
```shell
npm run gateway
```

Seed the database with users
```shell
npm run db:seed
```

Import the [requests collection](./Ghast%20API.postman_collection.json) into Postman to send requests to the local API gateway.

Deploy the stack on AWS
```shell
npm run deploy
```

Destroy the stack
```shell
cdk destroy
```