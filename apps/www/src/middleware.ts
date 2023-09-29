import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Redirect unauthenticated users to login page
    if (req.nextUrl.pathname !== '/login' && !req.nextauth.token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  },
  {
    pages: {
      signIn: '/login'
    }
  }
)
