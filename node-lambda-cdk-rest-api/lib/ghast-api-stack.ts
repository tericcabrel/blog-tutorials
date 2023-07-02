import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as path from "path";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as lambda from "aws-cdk-lib/aws-lambda-nodejs";

export class GhastApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigw.RestApi(this, `GhastApiGateway`, {
      restApiName: `ghast-api`,
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

    const createPostFn = new lambda.NodejsFunction(this, `CreatePostFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/create-post.ts'),
      functionName: `ghast-api-create-post`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2020',
      }
    });

    const findAllPostsFn = new lambda.NodejsFunction(this, `FindAllPostsFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/find-all-posts.ts'),
      functionName: `ghast-api-all-posts`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2020',
      }
    });

    const findSinglePostFn = new lambda.NodejsFunction(this, `FindSinglePostFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/find-one-post.ts'),
      functionName: `ghast-api-single-post`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2020',
      }
    });

    const updatePostFn = new lambda.NodejsFunction(this, `UpdatePostFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/update-post.ts'),
      functionName: `ghast-api-update-post`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2020',
      }
    });

    const deletePostFn = new lambda.NodejsFunction(this, `DeletePostFunction`, {
      entry: path.resolve(__dirname, '../src/handlers/delete-post.ts'),
      functionName: `ghast-api-delete-post`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2020',
      }
    });

    const createPostLambdaIntegration = new apigw.LambdaIntegration(createPostFn);
    const findAllPostsLambdaIntegration = new apigw.LambdaIntegration(findAllPostsFn);
    const findSinglePostLambdaIntegration = new apigw.LambdaIntegration(findSinglePostFn);
    const updatePostLambdaIntegration = new apigw.LambdaIntegration(updatePostFn);
    const deletePostLambdaIntegration = new apigw.LambdaIntegration(deletePostFn);

    const blogPostsResource = api.root.addResource("posts");
    blogPostsResource.addMethod("POST", createPostLambdaIntegration);
    blogPostsResource.addMethod("GET", findAllPostsLambdaIntegration);

    const blogPostResource = blogPostsResource.addResource("{id}");
    blogPostResource.addMethod("GET", findSinglePostLambdaIntegration);
    blogPostResource.addMethod("PUT", updatePostLambdaIntegration);
    blogPostResource.addMethod("DELETE", deletePostLambdaIntegration);
  }
}
