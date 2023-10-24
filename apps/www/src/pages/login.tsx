'use client'

import { Divider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { type ClientSafeProvider, signIn, useSession } from 'next-auth/react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { trpc } from '@/utils/trpc'

type LoginProvidersProps = {
  providers: ClientSafeProvider[]
}

function LoginProviders({ providers }: LoginProvidersProps) {
  return providers.length ? (
    <>
      {providers.map((provider) => {
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
  ) : null
}

export default function Login() {
  const { data: providers } = trpc.loginProviders.all.useQuery()
  const session = useSession()
  const router = useRouter()

  // Redirect authenticated users to the dashboard
  if (session.status === 'authenticated') {
    router.push('/')
  }

  return providers ? (
    <>
      {/* Login providers */}
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card>
          <CardHeader className="items-center space-y-1">
            <Icons.tulo className="h-10" color="#e66b6c" />
          </CardHeader>
          <CardContent className="grid gap-4">
            <Divider />
            <LoginProviders providers={Object.values(providers ?? {})} />
          </CardContent>
        </Card>
      </div>
      {/* Theme toggle */}
      <div className="absolute bottom-1 right-1">
        <ThemeToggle />
      </div>
    </>
  ) : null
}
