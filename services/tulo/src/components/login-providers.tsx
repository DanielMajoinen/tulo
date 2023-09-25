'use client'

import { type InferGetServerSidePropsType } from 'next'
import { signIn } from 'next-auth/react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { type getServerSideProps } from '@/pages/login'

export type LoginProvidersProps = {
  providers: InferGetServerSidePropsType<typeof getServerSideProps>['providers']
}

export function LoginProviders({ providers }: LoginProvidersProps) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div className="grid grid-cols-1 gap-6" key={provider.name}>
          <Button variant="outline" onClick={() => void signIn(provider.id)}>
            <Icons.google className="mr-2 h-4 w-4" />
            {provider.name}
          </Button>
        </div>
      ))}
    </>
  )
}
