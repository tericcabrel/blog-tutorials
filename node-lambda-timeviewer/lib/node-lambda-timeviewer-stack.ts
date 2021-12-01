import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';

export class NodeLambdaTimeviewerStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.NodejsFunction(this, 'TimeViewer', {
      entry: '../src/time-viewer.ts', // accepts .js, .jsx, .ts and .tsx files
      functionName: 'timeViewer',
      handler: 'handler',
      memorySize: 512,
      timeout: cdk.Duration.seconds(10)
    });
  }
}
