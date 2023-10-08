'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

export default function MenuHeader() {
  return (
    <div className="flex flex-none items-center justify-center gap-2 xl:flex-col xl:gap-5">
      <div>
        <Icons.tulo className="h-10" color="#e66b6c" />
      </div>
      <div>
        <Button className="rounded-full bg-[#e66b6c]" variant="destructive">
          Explore
        </Button>
      </div>
    </div>
  )
}
