'use client'

import { Outlet, TransitionIndicator } from '@verdant-web/react-router'
import { X } from 'lucide-react'
import { useRouter } from 'next/router'

import { Icons } from '@/components/Icons'

export default function ExploreLayout() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col gap-5">
      <div className="mx-5 mt-5 flex items-center justify-center">
        <span className="flex-1">
          <Icons.tulo className="h-10" color="#e66b6c" />
        </span>
        <div className="flex-none hover:cursor-pointer" onClick={() => router.back()}>
          <X />
        </div>
      </div>
      <div className="m-5 flex min-w-[440px] flex-1 gap-5">
        {/* Loading indicator */}
        <TransitionIndicator delay={300}>
          <div className="flex h-full w-full items-center justify-center">
            <Icons.spinner className="h-16 w-16 animate-spin" color="#e66b6c" />
          </div>
        </TransitionIndicator>
        <Outlet />
      </div>
    </div>
  )
}
