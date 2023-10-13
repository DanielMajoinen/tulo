'use client'

import { signIn } from 'next-auth/react'
import { Suspense } from 'react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { api } from '@/utils/api'

function LoginProviders() {
  const { data: providers } = api.loginProviders.getAllLoginProviders.useQuery()

  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => {
          const Icon = Icons[provider.name as keyof typeof Icons]

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

export default function Login() {
  return (
    <>
      {/* Login providers */}
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card>
          <CardHeader className="items-center space-y-1">
            <Icons.tulo className="h-10" color="#e66b6c" />
          </CardHeader>
          <Suspense>
            <CardContent className="grid gap-4">
              <Separator />
              <LoginProviders />
            </CardContent>
          </Suspense>
        </Card>
      </div>
      {/* Theme toggle */}
      <div className="absolute bottom-1 right-1">
        <ThemeToggle />
      </div>
    </>
  )
}
