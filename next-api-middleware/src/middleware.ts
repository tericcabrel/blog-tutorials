import { NextRequest, NextResponse } from 'next/server';

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith('/api/admin');
}

const isUserRoute = (pathname: string) => {
  return pathname.startsWith('/api/users');
}

export async function middleware(req: NextRequest) {
  const role = req.headers.get("authorization") ?? '';
  const { pathname } = req.nextUrl;

  if (isUserRoute(pathname) && !["user", "admin"].includes(role)) {
    return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
  }

  if (isAdminRoute(pathname) && role !== "admin") {
    return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/users/:path*', '/api/admin/:path*']
};
