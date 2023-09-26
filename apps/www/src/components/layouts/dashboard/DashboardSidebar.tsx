'use client'

import { Icons } from '@/components/icons'
import Footer from '@/components/menu/MenuFooter'
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
        <div className="flex items-baseline justify-center">
          <Icons.tulo className="h-8" color="#e66b6c" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 py-5">
        <MenuOptions activePageName={activePageName} />
      </CardContent>
      <Separator className="mb-5" />
      <CardFooter>
        <Footer />
      </CardFooter>
    </Card>
  )
}
