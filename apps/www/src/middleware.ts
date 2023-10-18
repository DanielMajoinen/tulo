import { NextResponse } from 'next/server'
import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware'

export default withAuth(
  // Middleware for requests authorized by the callback below
  function middleware(_req: NextRequestWithAuth) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ req, token }) {
        return token !== undefined || ['/api/', '/_vercel/'].some((path) => req.nextUrl.pathname.startsWith(path))
      }
    },
    pages: {
      signIn: '/login'
    }
  }
)
