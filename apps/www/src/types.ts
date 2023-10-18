export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type BoardInputColumn = {
  id: string
  name: string
  description: string
  type: 'text' | 'number' | 'currency'
  required: boolean
}

/**
 * @example 'Balance'
 */
export type BoardInput = {
  id: string
  name: string
  description: string
  required: boolean
} & (
  | {
      type: 'text' | 'number' | 'currency' | 'currency-select'
    }
  | {
      type: 'table'
      properties: BoardInputColumn[]
    }
)

/**
 * @example 'Account Balances & Transactions'
 */
export type Board = {
  id: string
  name: string
  description: string
  owner: string
  inputs: BoardInput[]
  tags?: string[]
}
