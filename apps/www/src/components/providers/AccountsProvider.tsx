'use client'

import { type ReactNode } from 'react'

import Accounts, { ClientDescriptor, migrations } from '@/stores/accounts'

export function AccountsProvider({ children }: { children: ReactNode }) {
  const clientDescriptor = new ClientDescriptor({
    migrations,
    namespace: 'accounts'
  })

  return <Accounts.Provider value={clientDescriptor}>{children}</Accounts.Provider>
}

export default AccountsProvider
