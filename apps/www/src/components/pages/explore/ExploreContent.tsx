import * as React from 'react'

import BoardCard from '@/components/pages/explore/BoardCard'
import { type Board } from '@/types'

type ExploreContentProps = {
  boards: Board[]
}

const ExploreContent: React.FC<ExploreContentProps> = ({ boards }: ExploreContentProps) => {
  return (
    <div className="flex flex-wrap gap-5">
      {boards.map((board) => (
        <BoardCard key={board.id} {...board} />
      ))}
    </div>
  )
}

export default ExploreContent
