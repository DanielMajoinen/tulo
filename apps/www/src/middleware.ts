import { NextResponse } from 'next/server'
import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Redirect unauthenticated users to login page
    if (req.nextUrl.pathname !== '/login' && !req.nextauth.token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Allow requests to /api/* and /_vercel/* to pass through
    const allowList = ['/api/', '/_vercel/']

    if (req.nextUrl.pathname !== '/' && !allowList.some((path) => req.nextUrl.pathname.startsWith(path))) {
      // Otherwise redirect to index page
      return NextResponse.redirect(new URL('/', req.url))
    }
  },
  {
    pages: {
      signIn: '/login'
    }
  }
)
