import { APIGatewayProxyHandler } from 'aws-lambda';

import { connect } from '@planetscale/database';

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
};

const connection = connect(config);

type AddBookInput = {
  isbn: string;
  title: string;
  summary: string;
  publishDate: string;
  priceCents: number;
  priceCurrency: 'EUR' | 'USD';
  isAvailable: boolean;
  pages: number;
  author: string;
  publisher: string;
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body ?? '{}') as AddBookInput;

  const query = `INSERT INTO books (isbn, title, summary, publish_date, price_cents, price_currency, is_available, pages, author, publisher) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    data.isbn,
    data.title,
    data.summary,
    data.publishDate,
    data.priceCents,
    data.priceCurrency,
    data.isAvailable,
    data.pages,
    data.author,
    data.publisher
  ];

  const results = await connection.execute(query, params);

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify({
      message: 'Book added successfully',
      bookId: results.insertId
    }),
  };
};
