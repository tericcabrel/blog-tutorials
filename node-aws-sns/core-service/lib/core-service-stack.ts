import * as path from "path";
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as sns from "aws-cdk-lib/aws-sns";

export class CoreServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const orderTopic = new sns.Topic(this, 'OrderTopic', {
      displayName: 'EcommerceOrderTopic',
      topicName: 'ecommerce-order-topic',
    });

    const processOrderFn = new lambda.NodejsFunction(this, 'ProcessOrderFunction', {
      entry: path.resolve(__dirname, '../src/handlers/process-order.ts'),
      functionName: 'core-service-process-order',
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
        ORDER_EVENTS_TOPIC_ARN: orderTopic.topicArn,
      },
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2023',
      }
    });

    orderTopic.grantPublish(processOrderFn);

    new cdk.CfnOutput(this, 'OrderTopicArn', {
      value: orderTopic.topicArn,
    });

    const findOrderFn = new lambda.NodejsFunction(this, 'FindOrderFunction', {
      entry: path.resolve(__dirname, '../src/handlers/find-order.ts'),
      functionName: `core-service-find-order`,
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2023',
      }
    });

    const findUserFn = new lambda.NodejsFunction(this, 'FindUserFunction', {
      entry: path.resolve(__dirname, '../src/handlers/find-user.ts'),
      functionName: 'core-service-find-user',
      handler: 'handler',
      memorySize: 512,
      environment: {
        DATABASE_URL: process.env.DATABASE_URL,
      },
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(15),
      bundling: {
        target: 'es2023',
      }
    });

    const api = new apigw.RestApi(this, 'EcommerceApiGateway', {
      restApiName: 'ecommerce-api',
      deployOptions: {
        // stageName: process.env.STAGE,
        metricsEnabled: true,
        loggingLevel: apigw.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
      cloudWatchRole: true, // Fix this issue: CloudWatch Logs role ARN must be set in account settings to enable logging
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS, // ["http://localhost:3000"],
        allowMethods: apigw.Cors.ALL_METHODS, // ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
      },
    });

    const processOrderLambdaIntegration = new apigw.LambdaIntegration(processOrderFn);
    const findOrderLambdaIntegration = new apigw.LambdaIntegration(findOrderFn);
    const findUserLambdaIntegration = new apigw.LambdaIntegration(findUserFn);

    const ordersResource = api.root.addResource("orders");
    ordersResource.addMethod("POST", processOrderLambdaIntegration);

    const orderResource = ordersResource.addResource("{id}");
    orderResource.addMethod("GET", findOrderLambdaIntegration);

    const usersResource = api.root.addResource("users");

    const userResource = usersResource.addResource("{id}");
    userResource.addMethod("GET", findUserLambdaIntegration);
  }
}
