# Host Static website with AWS S3

This is project demonstrates how to host a static website using the AWS CDK with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Installation

Install the CDK project and the website dependencies
```shell
npm install

cd website && npm install
```

Build the website to generate the static assets
```shell
cd website

npm run build
```
A `dist` folder is generated containing the static files

Deploy the stack on AWS
```shell
cdk bootstrap

cdk deploy
```
Once done, the CloudFront distribution URL will be printed in the console.