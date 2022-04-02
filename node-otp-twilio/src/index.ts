import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { generateRandomSixDigitsNumber } from './randon-number';
import { redisClient } from './redis-client';
import { twilioClient } from './twillio-client';

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/send-code', async (req, res) => {
  const recipientPhoneNumber = req.body.phoneNumber;
  const randomNumber = generateRandomSixDigitsNumber();

  const message = `Hello from Teco Blog! Your verification code is: ${randomNumber}`;

  await redisClient.set(recipientPhoneNumber, `${randomNumber}`, 'EX', 600);

  const response = await twilioClient.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: recipientPhoneNumber,
    body: message,
  });

  return res.json({ message: `Message sent with id: ${response.sid}` });
});

app.post('/verify-code', async (req, res) => {
  const recipientPhoneNumber = req.body.phoneNumber;
  const smsCodeReceived = req.body.smsCode;

  const value = await redisClient.get(recipientPhoneNumber);

  if (value === `${smsCodeReceived}`) {
    await redisClient.del(recipientPhoneNumber);

    return res.json({ message: 'This is a valid match!' });
  }

  return res.status(400).json({ message: `The phone number and the SMS code doesn't match.` });
});

app.listen(PORT, () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
