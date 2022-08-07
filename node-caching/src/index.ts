import express from 'express';
import dotenv from 'dotenv';
import { categoryRoute } from './routes/category.route';
import { productRoute } from './routes/product.route';
import { prisma } from './utils/prisma';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '8030');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', categoryRoute());
app.use('/', productRoute());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.listen(PORT, async () => {
  await prisma.$connect();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
