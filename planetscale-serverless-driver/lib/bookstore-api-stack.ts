import * as cdk from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as lambda from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from 'constructs';
import * as path from "path";

export class BookstoreApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigw.RestApi(this, `BookstoreApiGateway`, {
      restApiName: `bookstore-api`,
      deployOptions: {
        metricsEnabled: true,
        loggingLevel: apigw.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
      cloudWatchRole: true,
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
      },
    });

    const addBookFn = new lambda.NodejsFunction(this, `AddBookFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/add-book.ts'),
      functionName: `ghast-api-add-book`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      },
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2023',
      }
    });

    const listBooksFn = new lambda.NodejsFunction(this, `ListBooksFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/list-books.ts'),
      functionName: `bookstore-api-list-books`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      },
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2023',
      }
    });

    const getBookFn = new lambda.NodejsFunction(this, `GetBookFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/get-book.ts'),
      functionName: `bookstore-api-get-book`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      },
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2023',
      }
    });

    const updateBookFn = new lambda.NodejsFunction(this, `UpdateBookFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/update-book.ts'),
      functionName: `bookstore-api-update-book`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      },
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2023',
      }
    });

    const deleteBookFn = new lambda.NodejsFunction(this, `DeleteBookFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/delete-book.ts'),
      functionName: `bookstore-api-delete-book`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      },
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2023',
      }
    });

    const addBookLambdaIntegration = new apigw.LambdaIntegration(addBookFn);
    const booksResource = api.root.addResource("books");
    booksResource.addMethod("POST", addBookLambdaIntegration);

    const listBooksLambdaIntegration = new apigw.LambdaIntegration(listBooksFn);
    booksResource.addMethod("GET", listBooksLambdaIntegration);

    const getBookLambdaIntegration = new apigw.LambdaIntegration(getBookFn);
    const updateBookLambdaIntegration = new apigw.LambdaIntegration(updateBookFn);
    const deleteBookLambdaIntegration = new apigw.LambdaIntegration(deleteBookFn);

    const bookResource = booksResource.addResource("{id}");
    bookResource.addMethod("GET", getBookLambdaIntegration);
    bookResource.addMethod("PATCH", updateBookLambdaIntegration);
    bookResource.addMethod("DELETE", deleteBookLambdaIntegration);
  }
}
