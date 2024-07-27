import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // TODO send email

  res.status(200).json({ message: "The request processed successfully!" });
};
