import * as path from "path";
import * as cdk from 'aws-cdk-lib/core';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, SourceMapMode } from 'aws-cdk-lib/aws-lambda-nodejs';

export class NodeLambdaTimeviewerStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, 'TimeViewerLambda', {
      entry: path.resolve(__dirname, '../src/time-viewer.ts'), // accepts .js, .jsx, .ts and .tsx files
      functionName: 'time-viewer',
      handler: 'handler',
      memorySize: 512,
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(10),
      bundling: {
        minify: true, // minify code, defaults to false
        sourceMap: true, // include source map, defaults to false
        sourceMapMode: SourceMapMode.INLINE, // defaults to SourceMapMode.DEFAULT
        sourcesContent: false, // do not include original source into source map, defaults to true
        target: 'esnext', // target environment for the generated JavaScript code
        define: { // Replace strings during build time
          'process.env.COUNTRY': JSON.stringify('France'),
        },
      }
    });
  }
}