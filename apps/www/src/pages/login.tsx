'use client'

import { Divider } from '@nextui-org/react'
import type { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/navigation'
import { getProviders, signIn, useSession } from 'next-auth/react'

import { Icons } from '@/components/icons'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export const getStaticProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers: providers ?? ([] as InferGetStaticPropsType<typeof getProviders>)
    }
  }
}

type LoginProvidersProps = {
  providers: InferGetStaticPropsType<typeof getStaticProps>['providers']
}

function LoginProviders({ providers }: LoginProvidersProps) {
  return (
    <>
      {Object.values(providers).map((provider) => {
        const Icon = Icons[provider.name.toLowerCase() as keyof typeof Icons]

        return (
          <div className="grid grid-cols-1 gap-6" key={provider.name}>
            <Button variant="outline" onClick={() => void signIn(provider.id)}>
              {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
              {provider.name}
            </Button>
          </div>
        )
      })}
    </>
  )
}

export default function Login({ providers }: InferGetStaticPropsType<typeof getStaticProps>) {
  const session = useSession()
  const router = useRouter()

  // Redirect authenticated users to the dashboard
  if (session.status === 'authenticated') {
    router.push('/')
  }

  return (
    <>
      {/* Login providers */}
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card>
          <CardHeader className="space-y-1">
            <Logo className="justify-center" hideText={true} />
          </CardHeader>
          <CardContent className="grid gap-4">
            <Divider />
            <LoginProviders providers={providers} />
          </CardContent>
        </Card>
      </div>
      {/* Theme toggle */}
      <div className="absolute bottom-1 right-1">
        <ThemeToggle />
      </div>
    </>
  )
}
