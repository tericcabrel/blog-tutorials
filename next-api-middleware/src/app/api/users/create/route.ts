import type { NextApiRequest, NextApiResponse } from 'next';
import { User, users } from "@/data/users";

export function POST(req: NextApiRequest) {
  const userToAdd: User = {
    id: Math.random().toString(),
    name: req.body.name,
    role: "user",
  };

  users.push(userToAdd);

  return Response.json({ ...userToAdd });
}
