import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import expressHandlebars from 'express-handlebars';

import { connectToDatabase } from './databaseConnection';
import { loadDatabase } from './generateData';
import {downloadOrder, findAll, findOne, viewOrder} from './controllers/order.controller';
import { Order } from './models/order.model';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hbs = expressHandlebars.create({
  helpers: {
    round: function (number) {
      return number / 100;
    },
    date: function (dateString) {
      const date = new Date(dateString);

      return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.get('/orders', findAll);
app.get('/orders/:id', findOne);
app.get('/orders/:id/view', viewOrder);
app.get('/orders/:id/download', downloadOrder);

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(PORT, async () => {
  await connectToDatabase();

  // await loadDatabase(process.env.FAKER_LOCALE, process.env.CLEAN_DB === 'true');

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
