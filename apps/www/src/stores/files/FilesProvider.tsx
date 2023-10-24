'use client'

import { type ReactNode } from 'react'

import { ClientDescriptor } from './client'
import FileHooks from './hooks'
import migrations from './migrations'

export default function Provider({ children }: { children: ReactNode }) {
  const clientDescriptor = new ClientDescriptor({
    migrations,
    namespace: 'files'
  })

  return <FileHooks.Provider value={clientDescriptor}>{children}</FileHooks.Provider>
}
