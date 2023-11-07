import { type Validator } from '@/types'

export type PropertyTemplate = {
  name: string
  description: string
  type: 'text' | 'number' | 'currency'
  validator?: Validator
}

export type InputTemplate = {
  name: string
  description: string
  type: 'text' | 'number' | 'currency' | 'currency-select' | 'table'
  properties?: Record<string, PropertyTemplate>
  validator?: Validator
}

export type BoardTemplate = {
  id: string
  name: string
  description: string
  owner: string
  inputs: Record<string, InputTemplate>
  tags?: string[]
}
