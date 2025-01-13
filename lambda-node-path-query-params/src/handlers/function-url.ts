import type { LambdaFunctionURLHandler } from 'aws-lambda';

export const handler: LambdaFunctionURLHandler = async (event) => {

  const pathParameters = event.pathParameters;
  const queryParameters = event.queryStringParameters;

  console.log(pathParameters);
  console.log(queryParameters);

  return {
    body: JSON.stringify({ message: 'hello world' }),
    headers: { 'Content-Type': 'text/json' },
    statusCode: 200,
  };
};