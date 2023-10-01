'use client'

import { Home, PiggyBank } from 'lucide-react'

import MenuOption, { type MenuOptionProps } from '@/components/menu/MenuOption'

export type MenuOptionsProps = {
  activePageName?: string
  limitToActivePage?: boolean
}

export default function MenuOptions({ activePageName, limitToActivePage }: MenuOptionsProps) {
  const options: MenuOptionProps[] = [
    {
      icon: <Home />,
      name: 'Home',
      url: '/'
    },
    {
      icon: <PiggyBank />,
      name: 'Accounts',
      url: '/accounts'
    }
  ].filter(({ name }) => !limitToActivePage || !activePageName || name.toLowerCase() === activePageName.toLowerCase())

  return options.map(({ name, url, ...props }) => (
    <MenuOption
      key={name}
      name={name}
      isActive={activePageName?.toLowerCase() === name.toLowerCase()}
      url={limitToActivePage ? undefined : url}
      {...props}
    />
  ))
}
