'use client'

import MenuFooter from '@/components/menu/MenuFooter'
import MenuHeader from '@/components/menu/MenuHeader'
import MenuOptions from '@/components/menu/MenuOptions'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export type DashboardSidebarProps = {
  className?: string
  activePageName?: string
}

export default function DashboardSidebar({ className, activePageName }: DashboardSidebarProps) {
  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader className="flex-none p-0 py-5">
        <MenuHeader />
      </CardHeader>
      <Separator className="" />
      <CardContent className="flex-1 p-0 py-5">
        <MenuOptions activePageName={activePageName} />
      </CardContent>
      <Separator className="mb-5" />
      <CardFooter>
        <MenuFooter />
      </CardFooter>
    </Card>
  )
}
