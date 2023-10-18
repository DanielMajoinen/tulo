'use client'

import { Spinner } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'

const LoadingSpinner = () => (
  <div className="flex h-full w-full">
    <Spinner color="danger" aria-label="Loading..." />
  </div>
)

const SPA = dynamic(() => import('@/components/pages'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
  suspense: true
})

// Configure routes within @/components/pages/index.tsx
export default function Index() {
  const { data: session } = useSession({
    onUnauthenticated() {
      // Redirect unauthenticated users to the login page
      window.location.href = '/login'
    },
    required: true
  })

  return session ? <SPA /> : <LoadingSpinner />
}
