import { createStore } from 'zustand'

import { Templates } from '@/boards'
import { BoardHooks } from '@/stores/boards'

import { type BoardProviderProps, type BoardStore, type BoardStoreApi } from './types'
import { Inputs } from './util'

export const createBoardStore = ({ boardId }: BoardProviderProps): BoardStoreApi =>
  createStore<BoardStore>(() => {
    const board = BoardHooks.useBoard(boardId)?.getAll()
    const template = board ? Templates.get.board({ id: board.templateId }) : null

    return {
      board:
        board && template
          ? {
              inputs: Inputs.fromBoard(board),
              name: board?.name ?? template?.name ?? 'Unknown Board',
              template: {
                description: template.description,
                id: board.templateId,
                name: template.name,
                owner: template.owner,
                tags: template.tags
              }
            }
          : null
    }
  })
