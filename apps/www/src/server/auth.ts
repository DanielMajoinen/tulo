import { type GetServerSidePropsContext } from 'next'
import { type DefaultSession, getServerSession, type NextAuthOptions } from 'next-auth'
import { getToken as getJWT, type JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env.mjs'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string
    }
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session(params) {
      return {
        ...params.session,
        user: { ...params.session.user, id: params.token.email }
      }
    }
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET
    })
  ],
  session: { strategy: 'jwt' }
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: { req: GetServerSidePropsContext['req']; res: GetServerSidePropsContext['res'] }) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}

export const getToken = (ctx: { req: GetServerSidePropsContext['req'] }): Promise<JWT | null> => {
  return getJWT({
    req: ctx.req,
    secureCookie: process.env.NODE_ENV === 'production'
  })
}
