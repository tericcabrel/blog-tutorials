import express from 'express';
import dotenv from 'dotenv';
import { searchProducts } from './utils';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.get('/products/search', (req, res) => {
  const result = searchProducts();

  return res.json({ result, APP_PORT: PORT });
});

app.listen(PORT, () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
