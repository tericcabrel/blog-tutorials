import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const role = req.headers.get("authorization");

  if (role !== "admin") {
    return new Response(JSON.stringify({ message: 'Not authenticated.' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return NextResponse.next();
}
