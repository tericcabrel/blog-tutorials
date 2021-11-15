import express from 'express';

type User = { name: string };

let users: User[] = [];

const app = express();

app.use(express.json());

app.post('/users/register', (req, res) => {
  const newUser = {
    name: req.body.name,
  };

  users.push(newUser);

  return res.json(newUser);
});

app.delete('/users/{name}', (req, res) => {
  // @ts-ignore
  users = users.filter((user) => user.name != req.params.name);

  return res.json({ message: 'Success' });
});

app.listen(4650, () => {
  console.log(`Application started 🎉`);
});