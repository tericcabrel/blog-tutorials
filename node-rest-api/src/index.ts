import express from 'express';
import { connectToDatabase } from './db-connection';
import { roleRoutes } from './routes/role.route';
import { userRoutes } from './routes/user.route';

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', roleRoutes());
app.use('/', userRoutes());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.listen(PORT, async () => {
  await connectToDatabase();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
