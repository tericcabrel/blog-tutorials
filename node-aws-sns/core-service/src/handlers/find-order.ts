import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectToDatabase } from "../utils/db";
import { findOrder } from "../services/orders/order.repository";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const orderId = event.pathParameters.id;
  const order = await findOrder(orderId);

  if (order) {
    return {
      statusCode: 200,
      headers: {"Content-Type": "text/json"},
      body: JSON.stringify(order),
    };
  }

  return {
    statusCode: 404,
    headers: { "Content-Type": "text/json" },
    // @ts-ignore
    body: JSON.stringify({ message: `No user found with the ID "${orderId}"` }),
  };
};
