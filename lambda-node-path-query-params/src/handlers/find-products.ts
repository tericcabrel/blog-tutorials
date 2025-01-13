import { APIGatewayProxyHandler } from 'aws-lambda';
import { z } from 'zod';
import { productsData } from '../data/products';

const queryParametersSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').optional(),
  maxPrice: z.number({ coerce: true }).int().positive().optional(),
}).nullable();

const multiQueryParametersSchema = z.object({
  category: z.array(
    z.enum(
      ['electronics', 'foods', 'clothes', 'home'],
      { message: 'Category must be one of "electronics", "foods", "clothes", "home"' }
    )
  ).min(1, 'At least one category must be provided').optional(),
}).nullable();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const queryParameters = queryParametersSchema.safeParse(event.queryStringParameters);
  const multiQueryParameters = multiQueryParametersSchema.safeParse(event.multiValueQueryStringParameters);

  if (!queryParameters.success) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify({ message: queryParameters.error.errors.map((e) => e.message) }),
    };
  }

  if (!multiQueryParameters.success) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/json' },
      body: JSON.stringify({ message: multiQueryParameters.error.errors.map((e) => e.message) }),
    };
  }

  const { name, maxPrice } = queryParameters.data ?? {};
  const { category } = multiQueryParameters.data ?? {};

  const products = productsData.filter((product) => {
    if (name && !product.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }

    if (category && !category.includes(product.category)) {
      return false;
    }

    if (maxPrice && product.price > maxPrice) {
      return false;
    }

    return true;
  });

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/json' },
    body: JSON.stringify({ data: products }),
  };
};
