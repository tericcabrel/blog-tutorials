import express from 'express';
import { connectToDatabase } from './db-connection';
import { authenticateUser, createAdmin, registerUser } from './controllers/auth.controller';
import { authMiddleware } from './config/auth.middleware';
import { getAllUsers, getAuthenticatedUser } from './controllers/user.controller';
import { seedRoles } from './seeders/role-seeder';
import { seedAdmins } from './seeders/admin-seeder';

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authMiddleware);

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.post('/auth/signup', registerUser);
app.post('/auth/login', authenticateUser);
// @ts-ignore
app.get('/users', getAllUsers);
// @ts-ignore
app.get('/users/me', getAuthenticatedUser);
app.post('/auth/admins', createAdmin);

app.listen(PORT, async () => {
  await connectToDatabase();

  await seedRoles();

  await seedAdmins();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
