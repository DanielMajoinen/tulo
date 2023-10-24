'use client'

import { type ReactNode } from 'react'

import { ClientDescriptor, FileHooks, migrations } from '@/stores/files'

export default function Provider({ children }: { children: ReactNode }) {
  const clientDescriptor = new ClientDescriptor({
    migrations,
    namespace: 'files'
  })

  return <FileHooks.Provider value={clientDescriptor}>{children}</FileHooks.Provider>
}
