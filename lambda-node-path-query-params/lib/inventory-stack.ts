import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from "aws-cdk-lib/aws-lambda";

export class InventoryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigw.RestApi(this, `InventoryApiGateway`, {
      restApiName: `inventory-api`,
      deployOptions: {
        metricsEnabled: true,
        loggingLevel: apigw.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
      cloudWatchRole: true,
    });

    const findProductsFn = new lambda.NodejsFunction(this, `FindProductsFunction`, {
      bundling: {
        target: 'es2022',
      },
      entry: path.resolve(__dirname, '../src/handlers/find-products.ts'),
      functionName: `inventory-api-find-products`,
      handler: 'handler',
      memorySize: 512,
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(15)
    });

    const getProductFn = new lambda.NodejsFunction(this, `GetProductFunction`, {
      bundling: {
        target: 'es2022',
      },
      entry: path.resolve(__dirname, '../src/handlers/get-product.ts'),
      functionName: `inventory-api-get-product`,
      handler: 'handler',
      memorySize: 512,
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(15)
    });


    const findProductsLambdaIntegration = new apigw.LambdaIntegration(findProductsFn);

    const productsResource = api.root.addResource("products");
    productsResource.addMethod("GET", findProductsLambdaIntegration);

    const getProductLambdaIntegration = new apigw.LambdaIntegration(getProductFn);

    const productResource = productsResource.addResource("{id}");
    productResource.addMethod("GET", getProductLambdaIntegration);
  }
}
