#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BackendApiStack } from '../lib/backend-api-stack';

const app = new cdk.App();

new BackendApiStack(app, 'BackendApiDevStack', {
  concurrencyExecutions: 5,
  environment: 'development',
  memorySize: 512,
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION // eu-west-1
  },
});

new BackendApiStack(app, 'BackendApiStagingStack', {
  concurrencyExecutions: 50,
  environment: 'staging',
  memorySize: 512,
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION // eu-west-2
  },
});

new BackendApiStack(app, 'BackendApiProdStack', {
  concurrencyExecutions: 300,
  environment: 'production',
  memorySize: 1024,
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION // eu-west-3
  },
});