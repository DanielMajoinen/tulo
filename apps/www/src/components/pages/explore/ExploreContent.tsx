import BoardCard from '@/components/pages/explore/BoardCard'
import { type Board } from '@/types'

type ExploreContentProps = {
  boards: Board[]
}

export default function ExploreContent({ boards }: ExploreContentProps) {
  return (
    <div className="flex flex-wrap gap-5">
      {boards.map((board) => (
        <BoardCard key={board.id} {...board} />
      ))}
    </div>
  )
}
