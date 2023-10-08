'use client'

import { useSession } from 'next-auth/react'

import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout'
import ExploreContent from '@/components/pages/explore/ExploreContent'
import { api } from '@/utils/api'

export default function Explore() {
  const { data: sessionData } = useSession()
  const boards = api.boards.getAllBoards.useQuery(undefined, {
    enabled: sessionData !== undefined,
    staleTime: 3000
  })

  return (
    <DashboardLayout activePageName="Explore">
      {boards.isLoading && <p>Loading ...</p>}
      {boards.data && <ExploreContent boards={boards.data} />}
    </DashboardLayout>
  )
}
