import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  token: string;
  expiresIn: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ token: Math.random().toFixed(), expiresIn: 3600 });
};
