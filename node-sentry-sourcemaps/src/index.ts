import './instrument';

import * as Sentry from '@sentry/node';
import express from 'express';
import dotenv from 'dotenv';

import { setupRoute } from './route';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');
let requestCount = 0;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  requestCount++;

  return res.json({
    message: 'Hello World!',
    numberOfCall: requestCount,
  });
});

setupRoute(app);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
