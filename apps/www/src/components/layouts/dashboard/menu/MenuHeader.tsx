'use client'

import { Link } from '@verdant-web/react-router'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

type MenuHeaderProps = {
  activePageName?: string
}

export default function MenuHeader({ activePageName }: MenuHeaderProps = {}) {
  const isExplorePage = activePageName?.toLowerCase() === 'explore'
  return (
    <div className="flex flex-none items-center justify-center gap-2 xl:flex-col xl:gap-5">
      <Icons.tulo className="h-10" color="#e66b6c" />
      {!isExplorePage && (
        <Link to="/explore">
          <Button className={`rounded-full border-2 border-[#e66b6c] hover:bg-[#e66b6c]`} variant="outline">
            Explore
          </Button>
        </Link>
      )}
    </div>
  )
}
