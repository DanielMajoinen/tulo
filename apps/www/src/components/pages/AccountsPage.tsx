'use client'

import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout'
import { AccountsProvider } from '@/components/providers/AccountsProvider'

export default function AccountsPage() {
  return (
    <AccountsProvider>
      <DashboardLayout activePageName="Accounts">
        <h1>Accounts</h1>
      </DashboardLayout>
    </AccountsProvider>
  )
}
