'use client'

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { Menu } from 'lucide-react'

import { Icons } from '@/components/icons'
import MenuFooter from '@/components/menu/MenuFooter'
import MenuOptions from '@/components/menu/MenuOptions'
import { Separator } from '@/components/ui/separator'

export type DashboardHeaderProps = {
  activePageName?: string
}

export default function DashboardHeader({ activePageName }: DashboardHeaderProps) {
  return (
    <Navbar>
      <NavbarBrand>
        <Icons.tulo className="h-8" color="#e66b6c" />
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem className="flex flex-1 justify-center gap-3" isActive>
          <MenuOptions limitToActivePage={true} activePageName={activePageName} />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-[300px] flex-col p-0 py-5">
              <SheetHeader className="mb-10 flex-none">
                <SheetTitle className="ml-2">
                  <Icons.tulo className="h-8" color="#e66b6c" />
                </SheetTitle>
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
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
