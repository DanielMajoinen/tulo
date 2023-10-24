'use client'

import { type ReactNode } from 'react'

import { ClientDescriptor } from './client'
import BoardHooks from './hooks'
import migrations from './migrations'

export default function Provider({ children }: { children: ReactNode }) {
  const clientDescriptor = new ClientDescriptor({
    migrations,
    namespace: 'boards'
  })

  return <BoardHooks.Provider value={clientDescriptor}>{children}</BoardHooks.Provider>
}
