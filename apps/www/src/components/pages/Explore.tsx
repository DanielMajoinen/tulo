'use client'

import { useSession } from 'next-auth/react'

import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout'
import BoardCard from '@/components/pages/explore/BoardCard'
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
      {boards.data && (
        <div className="flex flex-wrap gap-5">
          {boards.data.map((board) => (
            <BoardCard key={board.id} {...board} />
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
