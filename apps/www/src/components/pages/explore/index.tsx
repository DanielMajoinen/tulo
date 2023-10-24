import { useAllBoards } from '@/boards'

import BoardCard from './BoardCard'

export default function Explore() {
  const boards = useAllBoards()

  return (
    <div className="flex flex-wrap gap-5">
      {boards.map((board) => (
        <BoardCard key={board.id} {...board} />
      ))}
    </div>
  )
}
