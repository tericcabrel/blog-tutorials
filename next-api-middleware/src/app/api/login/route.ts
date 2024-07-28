import type { NextApiRequest } from 'next';

export function POST(req: NextApiRequest) {
  const { email, password } = req.body;

  console.log({ email, password });

  // TODO: authenticate user

  return Response.json({
    token: Math.random().toString(),
    expiresIn: 3600
  });
}
