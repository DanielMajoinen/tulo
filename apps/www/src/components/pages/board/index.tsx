import { useMatch, useParams } from '@verdant-web/react-router'
import { useRouter } from 'next/router'

import { api } from '@/utils/api'

export default function Board() {
  const params = useParams()
  const router = useRouter()

  if (useMatch({ end: true, path: '/board' })) {
    router.back()
  }

  const board = api.boards.getBoard.useQuery({ id: params.id! })

  return <>{board.data && <p>{board.data.name}</p>}</>
}
