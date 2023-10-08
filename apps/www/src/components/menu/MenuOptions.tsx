'use client'

import MenuOption, { type MenuOptionProps } from '@/components/menu/MenuOption'

export type MenuOptionsProps = {
  activePageName?: string
}

export default function MenuOptions({ activePageName }: MenuOptionsProps) {
  // TODO: Get options from users boards via TRPC
  const options: MenuOptionProps[] = []

  return options.map(({ name, url, ...props }) => (
    <MenuOption key={name} name={name} isActive={activePageName?.toLowerCase() === name.toLowerCase()} url={url} {...props} />
  ))
}
