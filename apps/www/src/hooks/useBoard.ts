import { BoardHooks } from '@/stores/boards'

export function useBoard({ id }: { id?: string }) {
  const usedBoard = BoardHooks.useBoard(id!, { skip: !id })
  const board = usedBoard?.getAll() ?? null

  return {
    id: board?.id,
    inputs: board?.inputs,
    name: board?.name
  }
}
