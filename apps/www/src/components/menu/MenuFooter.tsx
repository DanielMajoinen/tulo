'use client'

import { User } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function MenuFooter() {
  const { data: sessionData } = useSession()

  return (
    <div className="flex flex-none flex-col gap-2">
      {sessionData?.user ? (
        <User
          name={sessionData.user.name ?? ''}
          description={
            <Button variant="link" className="h-1 p-0" onClick={() => void signOut()}>
              Sign out
            </Button>
          }
          className="flex-none text-center"
          avatarProps={{
            className: 'hidden'
          }}
        />
      ) : null}
      <div className="flex flex-none justify-center">
        <ThemeToggle />
      </div>
    </div>
  )
}
