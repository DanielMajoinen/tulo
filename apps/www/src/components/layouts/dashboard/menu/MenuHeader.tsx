import { Link } from '@verdant-web/react-router'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'

type MenuHeaderProps = {
  activePageName?: string
}

export default function MenuHeader({ activePageName }: MenuHeaderProps = {}) {
  const isExplorePage = activePageName?.toLowerCase() === 'explore'
  return (
    <div className="flex flex-none items-center justify-center gap-2 xl:flex-col xl:gap-5">
      <Icons.tulo className="h-10" color="var(--tulo-primary)" />
      {!isExplorePage && (
        <Link to="/explore">
          <Button className={'rounded-full border-2 border-[var(--tulo-primary)] hover:bg-[var(--tulo-primary)]'} variant="outline">
            Explore
          </Button>
        </Link>
      )}
    </div>
  )
}
