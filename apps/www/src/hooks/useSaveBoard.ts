import { useSession } from 'next-auth/react'

import { type DraftBoardStore } from '@/context'
import { BoardHooks } from '@/stores/boards'
import { InputHooks } from '@/stores/inputs'
import { type Prettify } from '@/types'

type UseSaveBoardProps = Prettify<Pick<DraftBoardStore, 'name' | 'inputs'>>

export const useSaveBoard = (): (({ name, inputs }: UseSaveBoardProps) => void) => {
  const { data: session } = useSession()

  const { boards: boardsClient, batch: boardsBatchFactory } = BoardHooks.useClient()
  const { inputs: inputsClient, batch: inputsBatchFactory } = InputHooks.useClient()

  const boardsBatch = boardsBatchFactory({ undoable: true })
  const inputsBatch = inputsBatchFactory({ undoable: true })

  return ({ name, inputs }) => {
    try {
      inputsBatch.run(() => {
        Object.values(inputs).map((input) =>
          inputsClient.put({
            // TODO: displayValue
            name: input.name,
            type: input.type,
            userId: session?.user?.id ?? '',
            value: input.value
          })
        )
      })

      boardsBatch.run(() => {
        boardsClient.put({
          inputs: Object.entries(inputs).map(([id, input]) => ({
            id,
            properties: Object.entries(input.properties ?? {}).map(([id, { value }]) => ({ id, value }))
          })),
          name,
          userId: session?.user?.id ?? ''
        })
      })

      boardsBatch.flush()
      inputsBatch.flush()
    } catch (error) {
      boardsBatch.discard()
      inputsBatch.discard()
    }
  }
}
