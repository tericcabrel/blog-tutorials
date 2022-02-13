import { NextRequest, NextResponse } from 'next/server';
import { includes } from "lodash";

export async function middleware(req: NextRequest) {
  const role = req.headers.get("authorization");

  if (!includes(["user", "admin"], role)) {
    return new Response(JSON.stringify({ message: 'Not authenticated.' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return NextResponse.next();
}
