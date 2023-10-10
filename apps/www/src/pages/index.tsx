'use client'

import { Spinner } from '@nextui-org/react'
import dynamic from 'next/dynamic'

const SPA = dynamic(() => import('@/components/pages'), {
  loading: () => (
    <div className="flex gap-4">
      <Spinner color="danger" aria-label="Loading..." />
    </div>
  ),
  ssr: false,
  suspense: true
})

// Configure routes within @/components/pages/index.tsx
export default function Index() {
  return <SPA />
}
