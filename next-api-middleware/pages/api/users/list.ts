import type { NextApiRequest, NextApiResponse } from 'next';
import { filter } from "lodash";
import { User, users } from "../../../data/users";

type Data = {
  data: User[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const simpleUsers: User[] = filter(users, (user) => user.role === "user");

  res.status(200).json({ data: simpleUsers });
};
