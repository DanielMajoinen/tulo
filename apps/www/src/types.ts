export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

/**
 * @example 'Balance'
 */
export type BoardInput = {
  id: string
  name: string
  description: string
  type: 'text' | 'number' | 'currency' | 'date' | 'switch' | 'currency-select'
}

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
