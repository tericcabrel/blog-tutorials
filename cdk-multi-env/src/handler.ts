import type { LambdaFunctionURLHandler } from 'aws-lambda';

export const handler: LambdaFunctionURLHandler = async (event) => {
  return {
    body: JSON.stringify({
      message: 'Hello from the backend API! - First Update',
      environment: process.env.ENVIRONMENT,
    }),
    headers: { 'Content-Type': 'text/json' },
    statusCode: 200,
  };
};
