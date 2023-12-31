'use client'

import { Menu } from 'lucide-react'
import { type ReactNode } from 'react'

import { MenuFooter, MenuOptions } from '@/components/layouts/dashboard/menu'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

type MenuSheetProps = {
  activePageName?: string
  icon?: ReactNode
}

export default function MenuSheet({ icon, activePageName }: MenuSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="flex w-[300px] flex-col p-0 py-5">
        <SheetHeader className="mb-10 flex-none">
          <SheetTitle className="ml-2">{icon}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 gap-3">
          <MenuOptions activePageName={activePageName} />
        </div>
        <Separator className="mb-5" />
        <SheetFooter className="flex flex-none sm:justify-center">
          <MenuFooter />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
