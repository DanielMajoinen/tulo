import { User } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'

import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '../ui/theme-toggle'

export type SidebarProps = {
  children?: React.ReactNode
  className?: string
}

export default function Sidebar({ className, children }: SidebarProps) {
  const { data: sessionData } = useSession()
  return (
    <Card className={`m-5 flex flex-col ${className}`}>
      <CardHeader className="flex-none p-0 py-5">
        <Logo className="justify-center" hideText={true} />
      </CardHeader>
      <CardContent className="flex-1 p-0 py-5">{children}</CardContent>
      <Separator className="mb-5" />
      <CardFooter className="flex flex-none flex-col gap-2">
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
        <div className="flex-none">
          <ThemeToggle />
        </div>
      </CardFooter>
    </Card>
  )
}
