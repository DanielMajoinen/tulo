'use client'

import { Link } from '@nextui-org/react'

export type MenuOptionProps = {
  name: string
  icon: React.ReactNode
  url?: string
  isActive?: boolean
}

export default function MenuOption({ name, icon, url, isActive }: MenuOptionProps) {
  return url ? (
    <div className="flex w-full flex-col">
      <Link href={url} className={`flex flex-none gap-3 px-5 py-3 hover:bg-[#e66b6c] hover:text-white ${isActive ? 'text-[#e66b6c]' : ''}`}>
        {icon}
        <span>{name}</span>
      </Link>
    </div>
  ) : (
    <div className="flex w-full gap-3">
      {icon}
      <span>{name}</span>
    </div>
  )
}
