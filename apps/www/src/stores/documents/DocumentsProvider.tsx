'use client'

import { type ReactNode } from 'react'

import { ClientDescriptor } from './client'
import DocumentHooks from './hooks'
import migrations from './migrations'

export default function Provider({ children }: { children: ReactNode }) {
  const clientDescriptor = new ClientDescriptor({
    migrations,
    namespace: 'documents'
  })

  return <DocumentHooks.Provider value={clientDescriptor}>{children}</DocumentHooks.Provider>
}
