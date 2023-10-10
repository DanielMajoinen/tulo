'use client'

import { Link } from '@verdant-web/react-router'
import { X } from 'lucide-react'
import * as React from 'react'

import { Icons } from '@/components/icons'

export type CreateLayoutProps = {
  children?: React.ReactNode
}

export default function CreateLayout({ children }: CreateLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col gap-5">
      <div className="mx-5 mt-5 flex items-center justify-center">
        <span className="flex-1">
          <Icons.tulo className="h-10" color="#e66b6c" />
        </span>
        <Link to="/" className="flex-none">
          <X />
        </Link>
      </div>
      <div className="m-5 flex min-w-[440px] flex-1 gap-5">{children}</div>
    </div>
  )
}
