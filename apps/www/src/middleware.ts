import { NextResponse } from 'next/server'
import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Always allow these requests
    if (['/login', '/_vercel/'].some((path) => req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.next()
    }

    // Redirect unauthenticated users to login page
    if (!req.nextauth.token && req.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  },
  {
    pages: {
      signIn: '/login'
    }
  }
)
