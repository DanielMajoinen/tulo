import { type Validator } from '@/types'

export type BoardInputColumnDefinition = {
  id: string
  name: string
  description: string
  type: 'text' | 'number' | 'currency'
  validator?: Validator
}

export type BoardInputDefinition = {
  id: string
  name: string
  description: string
  validator?: Validator
} & (
  | {
      type: 'text' | 'number' | 'currency' | 'currency-select'
    }
  | {
      type: 'table'
      properties: BoardInputColumnDefinition[]
    }
)

export type BoardDefinition = {
  id: string
  name: string
  description: string
  owner: string
  inputs: BoardInputDefinition[]
  tags?: string[]
}
