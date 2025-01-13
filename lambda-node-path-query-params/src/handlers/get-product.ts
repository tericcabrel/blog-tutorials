import { APIGatewayProxyHandler } from 'aws-lambda';
import { z } from 'zod';
import { productsData } from '../data/products';

const pathParametersSchema = z.object({
  id: z.number({ message: 'Product ID must be a number', coerce: true }),
});

export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const pathParameters = pathParametersSchema.safeParse(event.pathParameters);

  if (!pathParameters.success) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify({ message: pathParameters.error.errors[0].message }),
    };
  }
  const productId = pathParameters.data.id;

  const product = productsData.find((p) => p.id = productId);

  if (!product) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify({ message: `No product found with the ID "${productId}"` }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/json' },
    body: JSON.stringify({ data: product }),
  };
};
