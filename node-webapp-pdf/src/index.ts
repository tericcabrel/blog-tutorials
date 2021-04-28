import express from 'express';
import dotenv from 'dotenv';

import { connectToDatabase } from './databaseConnection';
import { loadDatabase } from './generateData';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.listen(PORT, async () => {
  await connectToDatabase();

  await loadDatabase(process.env.FAKER_LOCALE, process.env.CLEAN_DB === 'true');

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
