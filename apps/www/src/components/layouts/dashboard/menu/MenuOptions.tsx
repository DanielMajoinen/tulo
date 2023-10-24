import { Link } from '@verdant-web/react-router'
import { type ReactNode } from 'react'

type MenuOptionProps = {
  name: string
  icon: ReactNode
  url?: string
  isActive?: boolean
}

function MenuOption({ name, icon, url, isActive }: MenuOptionProps) {
  return url ? (
    <div className="flex w-full flex-col">
      <Link to={url} className={`flex flex-none gap-3 px-5 py-3 hover:bg-[#e66b6c] hover:text-white ${isActive ? 'text-[#e66b6c]' : ''}`}>
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

type MenuOptionsProps = {
  activePageName?: string
}

export default function MenuOptions({ activePageName }: MenuOptionsProps) {
  // TODO: Get options from client-side boards db
  const options: MenuOptionProps[] = []

  return options.map(({ name, url, ...props }) => (
    <MenuOption key={name} name={name} isActive={activePageName?.toLowerCase() === name.toLowerCase()} url={url} {...props} />
  ))
}
