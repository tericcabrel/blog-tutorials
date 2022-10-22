import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { sendMail } from './email-client';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

type ConfirmEmailPayload = {
  email: string;
  name: string;
  url: string;
};

app.post('/register', async (req, res) => {
  const { email, name } = req.body;

  // TODO Save user into the database

  const templateData: ConfirmEmailPayload = {
    email,
    name,
    url: 'generated_confirmation_url',
  };

  sendMail<ConfirmEmailPayload>({
    subject: 'Confirm your account',
    templateData,
    templatePath: path.join(__dirname, './email-template/confirm-account.html'),
    to: email,
  });

  return res.send({ message: 'User created successfully.' });
});

app.listen(PORT, () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
