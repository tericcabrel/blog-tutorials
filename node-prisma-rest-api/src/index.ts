import express from 'express';
import { prismaClient } from './database';
import { postRoute } from './post.route';

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.use('/', postRoute());

app.listen(PORT, async () => {
  await prismaClient.$connect();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
