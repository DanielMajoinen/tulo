import { useSession } from 'next-auth/react'
import { v4 as uuid } from 'uuid'

import { type DraftBoardStore } from '@/context'
import { BoardHooks } from '@/stores/boards'
import { InputHooks } from '@/stores/inputs'
import { type Prettify } from '@/types'

type UseSaveBoardProps = Prettify<
  Pick<DraftBoardStore, 'name' | 'inputs'> & {
    templateId: string
  }
>

export const useSaveBoard = (): (({ name, inputs }: UseSaveBoardProps) => string | undefined) => {
  const { data: session } = useSession()

  const { boards: boardsClient, batch: boardsBatchFactory } = BoardHooks.useClient()
  const { inputs: inputsClient, batch: inputsBatchFactory } = InputHooks.useClient()

  const boardsBatch = boardsBatchFactory({ undoable: true })
  const inputsBatch = inputsBatchFactory({ undoable: true })

  return ({ templateId, name, inputs }) => {
    try {
      const id = uuid()

      inputsBatch.run(() => {
        Object.values(inputs).map((input) =>
          inputsClient.put({
            name: input.name,
            type: input.type,
            userId: session?.user?.id ?? '',
            value: input.value
          })
        )
      })

      boardsBatch.run(() => {
        boardsClient.put({
          id,
          inputs: Object.entries(inputs).map(([id, input]) => ({
            id,
            properties: Object.entries(input.properties ?? {}).map(([id, { value }]) => ({ id, value }))
          })),
          name,
          templateId,
          userId: session?.user?.id ?? ''
        })
      })

      boardsBatch.flush()
      inputsBatch.flush()

      return id
    } catch (error) {
      boardsBatch.discard()
      inputsBatch.discard()

      return undefined
    }
  }
}
