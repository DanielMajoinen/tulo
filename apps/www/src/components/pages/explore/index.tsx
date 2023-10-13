import BoardCard from '@/components/pages/explore/BoardCard'
import ExploreContent from '@/components/pages/explore/ExploreContent'
import { api } from '@/utils/api'

export { BoardCard, ExploreContent }

export default function Explore() {
  const boards = api.boards.getAllBoards.useQuery(undefined, { staleTime: 60000 }) // Refresh every minute

  return <>{boards.data && <ExploreContent boards={boards.data} />}</>
}
