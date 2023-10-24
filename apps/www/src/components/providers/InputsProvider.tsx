'use client'

import { type ReactNode } from 'react'

import { ClientDescriptor, InputHooks, migrations } from '@/stores/inputs'

export default function Provider({ children }: { children: ReactNode }) {
  const clientDescriptor = new ClientDescriptor({
    migrations,
    namespace: 'inputs'
  })

  return <InputHooks.Provider value={clientDescriptor}>{children}</InputHooks.Provider>
}
