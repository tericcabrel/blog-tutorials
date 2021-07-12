import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './databaseConnection';
import { Language } from './models/language';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.get('/languages', async (req, res) => {
  const languages = await Language.find().sort({ name: 1 }).exec();

  return res.json({ data: languages });
});

app.listen(PORT, async () => {
  await connectToDatabase();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
