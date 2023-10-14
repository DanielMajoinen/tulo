import { NextResponse } from 'next/server'
import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Redirect authenticated users to home page
    if (req.nextauth.token && req.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Allow these unauthenticated requests
    if (['/login', '/api/', '/_vercel/'].some((path) => req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.next()
    }

    // Otherwise, redirect unauthenticated users to login page
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
