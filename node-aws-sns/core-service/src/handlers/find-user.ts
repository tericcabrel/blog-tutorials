import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectToDatabase } from "../utils/db";
import { findUser } from "../services/users/user.repository";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const userId = event.pathParameters.id;
  const user = await findUser(userId);

  if (user) {
    return {
      statusCode: 200,
      headers: {"Content-Type": "text/json"},
      body: JSON.stringify(user),
    };
  }

  return {
    statusCode: 400,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify({ message: `No user found with the ID "${userId}"` }),
  };
};
