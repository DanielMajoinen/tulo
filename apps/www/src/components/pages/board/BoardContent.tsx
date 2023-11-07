import { useBoardContext } from '@/context'

export default function BoardContent() {
  const { board } = useBoardContext((state) => ({ board: state.board }))

  return board ? <p>{board.name}</p> : null
}
