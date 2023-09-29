'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

import { Icons } from '@/components/icons'
import MenuOptions from '@/components/menu/MenuOptions'
import MenuSheet from '@/components/menu/MenuSheet'

export type DashboardHeaderProps = {
  activePageName?: string
}

export default function DashboardHeader({ activePageName }: DashboardHeaderProps) {
  const icon = <Icons.tulo className="h-8" color="#e66b6c" />

  return (
    <Navbar>
      <NavbarBrand>{icon}</NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem className="flex flex-1 justify-center gap-3" isActive>
          <MenuOptions activePageName={activePageName} limitToActivePage={true} />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <MenuSheet activePageName={activePageName} icon={icon} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
