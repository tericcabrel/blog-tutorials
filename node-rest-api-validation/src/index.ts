import express from 'express';
import dotenv from 'dotenv';
import { ValidationError } from 'yup';
import { registerUserSchema } from './validators/register-user-schema';
import { pathIdSchema } from './validators/path-id-schema';
import { searchBookSchema } from './validators/search-book-schema';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.post('/users/register', (req, res) => {
  const { body } = req;

  try {
    const data = registerUserSchema.validateSync(body, { abortEarly: false, stripUnknown: true });

    return res.json({ message: 'Success', data });
  } catch (e) {
    const error = e as ValidationError;

    return res.status(422).json({ errors: error.errors });
  }
});

app.get('/books/search', (req, res) => {
  const input = req.query;

  try {
    const data = searchBookSchema.validateSync(input, { abortEarly: false, stripUnknown: true });

    return res.json({ message: 'Success', data });
  } catch (e) {
    const error = e as ValidationError;

    return res.status(422).json({ errors: error.errors });
  }
});

app.get('/books/:id', (req, res) => {
  const input = { id: req.params.id };

  try {
    const data = pathIdSchema.validateSync(input, { abortEarly: false, stripUnknown: true });

    return res.json({ message: 'Success', data });
  } catch (e) {
    const error = e as ValidationError;

    return res.status(422).json({ errors: error.errors });
  }
});

app.listen(PORT, () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
