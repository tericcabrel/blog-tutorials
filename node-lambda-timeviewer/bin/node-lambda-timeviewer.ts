#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { NodeLambdaTimeviewerStack } from '../lib/node-lambda-timeviewer-stack';

const app = new cdk.App();
new NodeLambdaTimeviewerStack(app, 'NodeLambdaTimeviewerStack');
