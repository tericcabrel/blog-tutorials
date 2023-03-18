import express from 'express';
import dotenv from 'dotenv';
import { Connection } from 'amqplib';
import { connectToRabbitMQ } from './rabbitmq-connection';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let rabbitConnection: Connection;
const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.post('/register', async (req, res) => {
  const { email, name } = req.body;

  // TODO save register in the database

  const QUEUE_NAME = 'user-registration';
  const messageData = {
    fullName: name,
    emailAddress: email,
    confirmationCode: Math.floor(Math.random() * 900000) + 100000,
  };
  const messageDataAsString = JSON.stringify(messageData);

  const channel = await rabbitConnection.createChannel();

  channel.sendToQueue(QUEUE_NAME, Buffer.from(messageDataAsString));

  return res.json({ message: 'User registered successfully' });
});

app.listen(PORT, async () => {
  rabbitConnection = await connectToRabbitMQ();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
