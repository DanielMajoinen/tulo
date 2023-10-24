import { TransactionHistoryBoard } from '@/boards/transaction-history'

export * from './types'

const boards = [TransactionHistoryBoard]

export type BoardId = 'transaction-history'

export const useBoard = (boardId: BoardId) => {
  return boards.find((board) => board.id === boardId)
}

export const useAllBoards = () => {
  return boards
}
