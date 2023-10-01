'use client'

import * as React from 'react'

import DashboardHeader from '@/components/layouts/dashboard/DashboardHeader'
import DashboardSidebar from '@/components/layouts/dashboard/DashboardSidebar'

export type DashboardLayoutProps = {
  children?: React.ReactNode
  activePageName?: string
}

export default function DashboardLayout({ activePageName, children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col gap-5">
      {/* Header only displayed on small sized screens */}
      <div className="mx-5 mt-5 flex-none xl:hidden">
        <DashboardHeader activePageName={activePageName} />
      </div>
      {/* Sidebar only displayed on medium sized screens */}
      <div className="flex flex-1 gap-5">
        <DashboardSidebar className="my-5 ml-5 hidden xl:flex" activePageName={activePageName} />
        <div className="flex flex-1">
          <div className="m-5 md:mx-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
