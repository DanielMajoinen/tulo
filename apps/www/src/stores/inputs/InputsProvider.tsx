'use client'

import { type ReactNode } from 'react'

import { ClientDescriptor } from './client'
import InputHooks from './hooks'
import migrations from './migrations'

export default function Provider({ children }: { children: ReactNode }) {
  const clientDescriptor = new ClientDescriptor({
    migrations,
    namespace: 'inputs'
  })

  return <InputHooks.Provider value={clientDescriptor}>{children}</InputHooks.Provider>
}
