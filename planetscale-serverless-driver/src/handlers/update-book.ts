import { APIGatewayProxyHandler } from 'aws-lambda';

import { connect } from '@planetscale/database';

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
};

const connection = connect(config);

type UpdateBookInput = {
  title: string;
  summary: string;
  priceCents: number;
  isAvailable: boolean;
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const bookId = event.pathParameters.id;

  const results = await connection.execute(`SELECT id FROM books WHERE id = ?`, [bookId]);

  const book = results.rows[0];

  if (!book) {
    return {
      statusCode: 404,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify({ message: `No book found with the ID "${bookId}"` }),
    };
  }

  const data = JSON.parse(event.body ?? '{}') as UpdateBookInput;

  const query = `UPDATE books SET title = ?, summary = ?, price_cents = ?, is_available = ? WHERE id = ?`;
  const params = [
    data.title,
    data.summary,
    data.priceCents,
    data.isAvailable,
    bookId
  ];

  await connection.execute(query, params);

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify({ message: 'Book updated successfully' }),
  };
};
