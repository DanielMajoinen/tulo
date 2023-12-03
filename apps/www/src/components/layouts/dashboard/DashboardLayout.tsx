import { Outlet, TransitionIndicator } from '@verdant-web/react-router'

import { Icons } from '@/components/Icons'
import { DashboardHeader, DashboardSidebar } from '@/components/layouts/dashboard'

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col gap-5">
      {/* Header - only displayed on <= xl sized screens */}
      <div className="mx-5 mt-5 flex-none xl:hidden">
        <DashboardHeader />
      </div>
      {/* Contents */}
      <div className="flex flex-1 gap-5">
        {/* Sidebar - only displayed on >= xl sized screens */}
        <DashboardSidebar className="my-5 ml-5 hidden xl:flex" />
        {/* Main content */}
        <div className="m-5 flex flex-1 xl:ml-0">
          {/* Loading indicator */}
          <TransitionIndicator delay={300}>
            <div className="flex h-full w-full items-center justify-center">
              <Icons.spinner className="h-16 w-16 animate-spin" color="var(--tulo-primary)" />
            </div>
          </TransitionIndicator>
          {/* Child content */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
