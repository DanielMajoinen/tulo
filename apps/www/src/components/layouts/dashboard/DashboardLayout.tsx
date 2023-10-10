'use client'

import { type ReactNode } from 'react'

import { DashboardHeader, DashboardSidebar } from '@/components/layouts/dashboard'

type DashboardLayoutProps = {
  children?: ReactNode
  activePageName?: string
}

export default function DashboardLayout({ activePageName, children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col gap-5">
      {/* Header only displayed on small sized screens */}
      <div className="mx-5 mt-5 flex-none xl:hidden">
        <DashboardHeader activePageName={activePageName} />
      </div>
      {/* Contents */}
      <div className="flex flex-1 gap-5">
        {/* Sidebar only displayed on medium sized screens */}
        <DashboardSidebar className="my-5 ml-5 hidden xl:flex" activePageName={activePageName} />
        <div className="m-5 flex flex-1 xl:ml-0">{children}</div>
      </div>
    </div>
  )
}
