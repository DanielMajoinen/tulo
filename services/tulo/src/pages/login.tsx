import { Divider } from '@nextui-org/react'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth/next'
import { getProviders } from 'next-auth/react'
import Head from 'next/head'

import { LoginProviders } from '@/components/login-providers'
import Logo from '@/components/logo'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { authOptions } from '@/server/auth'

export default function Login({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Sign In | Tulo</title>
        <meta name="description" content="Sign in to Tulo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
        <Card>
          <CardHeader className="space-y-1">
            <Logo hideText={true} />
          </CardHeader>
          <CardContent className="grid gap-4">
            <Divider />
            <LoginProviders providers={providers} />
          </CardContent>
        </Card>
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } }
  }

  const providers = await getProviders()

  return {
    props: { providers: providers ?? [] }
  }
}
