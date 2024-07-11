import { APIGatewayProxyHandler } from 'aws-lambda';

import { connect } from '@planetscale/database';

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
};

const connection = connect(config);

type Book = {
  id: number;
  isbn: string;
  title: string;
  summary: string;
  publish_date: string;
  price_cents: number;
  price_currency: 'EUR' | 'USD';
  is_available: boolean;
  pages: number;
  author: string;
  publisher: string;
  createdAt: string;
  updatedAt: string;
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const query = `SELECT * FROM books ORDER BY publish_date DESC`;

  const results = await connection.execute<Book>(query);

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify({
      data: results.rows
    }),
  };
};
