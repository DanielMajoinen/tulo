import { type z } from 'zod'
import { type StoreApi } from 'zustand'

import { type BoardDefinition, type BoardInputColumnDefinition, type BoardInputDefinition } from '@/boards'
import { type Prettify, type Validator } from '@/types'

export type DraftValue = {
  value: string
  error: z.ZodError<any> | null
  validator?: Validator
}

export type DraftInputProperty = Prettify<Prettify<Pick<BoardInputColumnDefinition, 'description' | 'name' | 'type'>> & DraftValue>

export type DraftInput = Prettify<
  Prettify<Pick<BoardInputDefinition, 'description' | 'name' | 'type'>> &
    DraftValue & {
      properties: Record<string, DraftInputProperty>
    }
>

export type DraftBoardStore = {
  name: string
  inputs: Record<string, DraftInput>
  saveBoard: (() => string | undefined) | null
  setName: (name: string) => void
  setInputValue: (id: string, value: string) => void
  setInputPropertyValue: (id: string, property: string, value: string) => void
}

export type DraftBoardStoreApi = StoreApi<DraftBoardStore>

export type DraftBoardProviderProps = { board: BoardDefinition }
