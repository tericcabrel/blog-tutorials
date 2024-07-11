import { APIGatewayProxyHandler } from 'aws-lambda';
import { connect } from "@planetscale/database";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
};

const connection = connect(config);

export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const bookId = event.pathParameters.id;

  await connection.execute(`DELETE FROM books WHERE id = ?`, [bookId]);

  return {
    statusCode: 204,
    headers: { "Content-Type": "text/json" },
    body: undefined,
  };
};