#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { LambdaNodeCdkStack } from '../lib/lambda-node-cdk-stack';

const app = new cdk.App();
new LambdaNodeCdkStack(app, 'LambdaNodeCdkStack');
