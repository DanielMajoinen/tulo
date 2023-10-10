'use client'

import { MenuFooter, MenuHeader, MenuOptions } from '@/components/layouts/dashboard/menu'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type DashboardSidebarProps = {
  className?: string
  activePageName?: string
}

export default function DashboardSidebar({ className, activePageName }: DashboardSidebarProps) {
  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader className="flex-none p-0 py-5">
        <MenuHeader activePageName={activePageName} />
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
