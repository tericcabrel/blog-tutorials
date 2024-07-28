import type { NextApiRequest } from 'next';

export function POST(req: NextApiRequest) {
  const { email, message } = req.body;

  console.log({ email, message });

  // TODO send email

  return Response.json({ message: "The request processed successfully!" });
}
