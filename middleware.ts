/* eslint-disable consistent-return */

import { NextRequest, NextResponse } from 'next/server';

import { getSession } from './utils/session';

const URLS_PUBLIC_ONLY: Readonly<Record<string, boolean>> = {
  '/': false,
  '/create-account': true,
  '/log-in': true,
  '/profile': false,
};

const middleware = async (request: NextRequest) => {
  const isPublicRequest = URLS_PUBLIC_ONLY[request.nextUrl.pathname];

  const session = await getSession();

  if (!session.id) {
    if (!isPublicRequest) {
      return NextResponse.redirect(new URL('/log-in', request.url));
    }
  } else if (isPublicRequest) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default middleware;
