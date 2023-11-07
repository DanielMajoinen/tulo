import { type StoreApi } from 'zustand'

import { type Validator } from '@/types'

export type PropertyContext = {
  name: string
  template: {
    id: string
    name: string
    description: string
    type: 'text' | 'number' | 'currency'
    validator?: Validator
  }
  value?: string
}

export type InputContext = {
  name: string
  template: {
    id: string
    name: string
    description: string
    type: 'text' | 'number' | 'currency' | 'currency-select' | 'table'
    validator?: Validator
  }
  properties?: Record<string, PropertyContext>
  value?: string
}

export type BoardContext = {
  inputs: Record<string, InputContext>
  name: string
  template: {
    id: string
    description: string
    name: string
    owner: string
    tags?: string[]
  }
}

export type BoardStore = {
  board: BoardContext | null
}

export type BoardStoreApi = StoreApi<BoardStore>

export type BoardProviderProps = { boardId: string }
