import type { NextApiRequest, NextApiResponse } from 'next';
import { User, users } from "../../../data/users";

export default function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  const userToAdd: User = {
    id: Math.random().toString(),
    name: req.body.name,
    role: "user",
  };

  users.push(userToAdd);

  res.status(200).json({ ...userToAdd });
};
