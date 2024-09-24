import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from "path";
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as snsSubscriptions from 'aws-cdk-lib/aws-sns-subscriptions';

export class NotificationServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const notificationFn = new lambda.NodejsFunction(this, `NotificationFunction`, {
      functionName: `notification-service-notify-customers`,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, '..'), {
        bundling: {
          image: Runtime.NODEJS_20_X.bundlingImage,
          command: [
            'bash', '-c', [
              'export NPM_CONFIG_CACHE=/tmp/.npm',
              'npm ci',
              './node_modules/.bin/esbuild src/handlers/notify-customers.ts --bundle --platform=node --target=node20 --outdir=/asset-output',
              'mv /asset-output/notify-customers.js /asset-output/index.js',
              'cp -r ./src/templates /asset-output/templates',
            ].join(' && ')
          ],
        },
      }),
      memorySize: 512,
      environment: {
        CORE_SERVICE_API_URL: process.env.CORE_SERVICE_API_URL,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
        FROM_EMAIL: process.env.FROM_EMAIL,
      },
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(300),
    });

    const orderTopic = sns.Topic.fromTopicArn(this, 'OrderTopic', process.env.ORDER_EVENTS_TOPIC_ARN);

    orderTopic.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);

    orderTopic.addSubscription(new snsSubscriptions.LambdaSubscription(notificationFn));
    orderTopic.grantSubscribe(notificationFn);
  }
}
