import { useParams } from '@verdant-web/react-router'

import { BoardProvider } from '@/context'

import BoardContent from './BoardContent'

export default function Board() {
  const params = useParams()

  return params.id ? (
    <BoardProvider boardId={params.id}>
      <BoardContent />
    </BoardProvider>
  ) : null
}
