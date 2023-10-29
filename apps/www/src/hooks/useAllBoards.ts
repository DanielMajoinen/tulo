import { useSession } from 'next-auth/react'

import { BoardHooks } from '@/stores/boards'

export function useAllBoards() {
  const { data: session } = useSession()

  return BoardHooks.useAllBoards()
    .map((board) => board.getAll())
    .filter((board) => board.userId === session?.user.id)
}
