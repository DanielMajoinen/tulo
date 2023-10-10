'use client'

import { useParams } from '@verdant-web/react-router'
import { useRouter } from 'next/router'

import CreateLayout from '@/components/layouts/create/CreateLayout'
import { CreateUserBoardContent } from '@/components/pages/create/index'
import { api } from '@/utils/api'

export default function Create() {
  const params = useParams()
  const router = useRouter()

  if (!params.id) {
    router.back()
  }

  const board = api.boards.getBoard.useQuery({ id: params.id! })

  return (
    <CreateLayout>
      {board.isLoading && <p>Loading ...</p>}
      {board.data && <CreateUserBoardContent board={board.data} />}
    </CreateLayout>
  )
}
