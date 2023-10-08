'use client'

import { Globe } from 'lucide-react'

import MenuOption, { type MenuOptionProps } from '@/components/menu/MenuOption'

export type MenuOptionsProps = {
  activePageName?: string
  limitToActivePage?: boolean
}

export default function MenuOptions({ activePageName, limitToActivePage }: MenuOptionsProps) {
  const options: MenuOptionProps[] = [
    {
      icon: <Globe />,
      name: 'Explore',
      url: '/'
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
