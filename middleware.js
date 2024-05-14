import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  //Dark Mode
  if (!req.cookies.has('mode')) {
    const res = NextResponse.next();
    res.cookies.set({
      name: 'mode',
      value: 'light',
      maxAge: 3600 * 24 * 400,
      httpOnly: false,
    });
    return res;
  }

  if (req.nextUrl.pathname.startsWith('/posting/write')) {
    const session = await getToken({ req: req });
    if (!session) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith('/posting/detail')) {
    const session = await getToken({ req: req });
    if (!session) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith('/posting/update')) {
    const session = await getToken({ req: req });
    if (!session) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }
    return NextResponse.next();
  }
}
