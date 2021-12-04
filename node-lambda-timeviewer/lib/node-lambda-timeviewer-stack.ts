import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as path from "path";

export class NodeLambdaTimeviewerStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.NodejsFunction(this, 'TimeViewer', {
      entry: path.resolve(__dirname, '../src/time-viewer.ts'), // accepts .js, .jsx, .ts and .tsx files
      functionName: 'timeViewer',
      handler: 'handler',
      memorySize: 512,
      timeout: cdk.Duration.seconds(10),
      bundling: {
        minify: true, // minify code, defaults to false
        sourceMap: true, // include source map, defaults to false
        sourceMapMode: lambda.SourceMapMode.INLINE, // defaults to SourceMapMode.DEFAULT
        sourcesContent: false, // do not include original source into source map, defaults to true
        target: 'es2020', // target environment for the generated JavaScript code
        define: { // Replace strings during build time
          'process.env.COUNTRY': JSON.stringify('France'),
        },
      }
    });
  }
}
