import { type z } from 'zod'

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type BoardInputColumnDefinition = {
  id: string
  name: string
  description: string
  type: 'text' | 'number' | 'currency'
  required: boolean
  validator?: { safeParse: (data: unknown) => z.SafeParseReturnType<any, any> }
}

export type BoardInputDefinition = {
  id: string
  name: string
  description: string
  required: boolean
  validator?: { safeParse: (data: unknown) => z.SafeParseReturnType<any, any> }
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
