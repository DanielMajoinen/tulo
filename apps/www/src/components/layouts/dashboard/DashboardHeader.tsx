'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

import { Icons } from '@/components/icons'
import MenuHeader from '@/components/menu/MenuHeader'
import MenuSheet from '@/components/menu/MenuSheet'

export type DashboardHeaderProps = {
  activePageName?: string
}

export default function DashboardHeader({ activePageName }: DashboardHeaderProps) {
  return (
    <Navbar>
      <NavbarBrand>
        <MenuHeader />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <MenuSheet activePageName={activePageName} icon={<Icons.tulo className="h-10" color="#e66b6c" />} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
