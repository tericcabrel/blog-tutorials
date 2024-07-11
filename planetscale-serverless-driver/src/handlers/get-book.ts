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

  const bookId = event.pathParameters.id;

  const results = await connection.execute<Book>(`SELECT * FROM books WHERE id = ?`, [bookId], { as: 'object' });

  const book = results.rows[0];

  if (book) {
    return {
      statusCode: 200,
      headers: {"Content-Type": "text/json"},
      body: JSON.stringify({ data: book }),
    };
  }

  return {
    statusCode: 404,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify({ message: `No book found with the ID "${bookId}"` }),
  };
};