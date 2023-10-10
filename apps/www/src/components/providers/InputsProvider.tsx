'use client'

import { type ReactNode } from 'react'

import Store, { ClientDescriptor, migrations } from '@/stores/inputs'

export default function Provider({ children }: { children: ReactNode }) {
  const clientDescriptor = new ClientDescriptor({
    migrations,
    namespace: 'inputs'
  })

  return <Store.Provider value={clientDescriptor}>{children}</Store.Provider>
}
