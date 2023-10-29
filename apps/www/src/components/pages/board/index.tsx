import { useMatch, useParams } from '@verdant-web/react-router'
import { useRouter } from 'next/router'

import { useBoard } from '@/hooks/useBoard'

export default function Board() {
  const router = useRouter()
  if (useMatch({ end: true, path: '/board' })) {
    router.back()
  }

  const params = useParams()
  const board = useBoard({ id: params.id! })

  return <p>{board.name}</p>
}
