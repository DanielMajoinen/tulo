'use client'

import { type ReactNode } from 'react'

import { BoardHooks, ClientDescriptor, migrations } from '@/stores/boards'

export default function Provider({ children }: { children: ReactNode }) {
  const clientDescriptor = new ClientDescriptor({
    migrations,
    namespace: 'boards'
  })

  return <BoardHooks.Provider value={clientDescriptor}>{children}</BoardHooks.Provider>
}
