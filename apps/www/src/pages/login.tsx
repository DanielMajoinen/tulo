'use client'

import { Divider } from '@nextui-org/react'
import type { InferGetStaticPropsType } from 'next'
import { getProviders, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { LoginProviders } from '@/components/login-providers'
import Logo from '@/components/logo'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const getStaticProps = async () => {
  const providers = await getProviders()

  return {
    props: { providers: providers ?? ([] as InferGetStaticPropsType<typeof getProviders>) }
  }
}

export default function Login({ providers }: InferGetStaticPropsType<typeof getStaticProps>) {
  const session = useSession()
  const router = useRouter()

  // Redirect authenticated users to the dashboard
  // TODO: Move this logic into middleware
  if (session.status === 'authenticated') {
    router.push('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <Logo hideText={true} />
        </CardHeader>
        <CardContent className="grid gap-4">
          <Divider />
          <LoginProviders providers={providers} />
        </CardContent>
      </Card>
    </div>
  )
}
