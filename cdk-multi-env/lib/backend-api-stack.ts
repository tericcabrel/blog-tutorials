import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { resolve } from "node:path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { FunctionUrlAuthType, InvokeMode, Runtime } from "aws-cdk-lib/aws-lambda";

interface BackendApiStackProps extends cdk.StackProps {
  readonly memorySize: number;
  readonly concurrencyExecutions: number;
  readonly environment: 'development' | 'staging' | 'production';
}

export class BackendApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BackendApiStackProps) {
    super(scope, id, props);

    const lambdaApi = new NodejsFunction(this, 'BackendApiLambda', {
      bundling: {
        target: 'es2022',
      },
      entry: resolve(__dirname, '../src/handler.ts'),
      environment: {
        ENVIRONMENT: props.environment,
      },
      functionName: 'backend-api-lambda',
      handler: 'handler',
      memorySize: props.memorySize,
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(60),
      reservedConcurrentExecutions: props.concurrencyExecutions,
    });

    const lambdaFunctionUrl = lambdaApi.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      invokeMode: InvokeMode.BUFFERED,
    });

    new cdk.CfnOutput(this, 'BackendApiUrl', {
      value: lambdaFunctionUrl.url,
    });
  }
}
