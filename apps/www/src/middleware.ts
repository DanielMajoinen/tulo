import { NextResponse } from 'next/server'
import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Redirect unauthenticated users to login page
    if (req.nextUrl.pathname !== '/login' && !req.nextauth.token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Otherwise redirect to index
    if (req.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  },
  {
    pages: {
      signIn: '/login'
    }
  }
)
