import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

import { Icons } from '@/components/Icons'
import { MenuHeader, MenuSheet } from '@/components/layouts/dashboard/menu'

type DashboardHeaderProps = {
  activePageName?: string
}

export default function DashboardHeader({ activePageName }: DashboardHeaderProps) {
  return (
    <Navbar>
      <NavbarBrand>
        <MenuHeader activePageName={activePageName} />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <MenuSheet activePageName={activePageName} icon={<Icons.tulo className="h-10" color="var(--tulo-primary)" />} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
