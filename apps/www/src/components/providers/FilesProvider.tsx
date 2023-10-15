'use client'

import { type ReactNode } from 'react'

import Store, { ClientDescriptor, migrations } from '@/stores/files'

export default function Provider({ children }: { children: ReactNode }) {
  const clientDescriptor = new ClientDescriptor({
    migrations,
    namespace: 'files'
  })

  return <Store.Provider value={clientDescriptor}>{children}</Store.Provider>
}
