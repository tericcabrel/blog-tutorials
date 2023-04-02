import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.set('trust proxy', true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.get('/ipv4', (req, res) => {
  const ipAddress = req.ip;

  return res.json({ message: `Hello! Your IP address is: ${ipAddress}` });
});

app.listen(PORT, () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
