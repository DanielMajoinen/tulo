export type OutputField = {
  id: string
  name: string
  type: 'text' | 'number' | 'date'
}

export type OutputFields = OutputField[]

export type Output = {
  id: string
  name: string
  fields: OutputFields
  multiple?: boolean
}

export type Outputs = Output[]

export type InputField = {
  id: string
  name: string
  type: 'text' | 'number' | 'date' | 'checkbox' | 'select'
  options?: {
    label: string
    value: string
  }[]
}

export type InputFields = InputField[]

export type Input = {
  id: string
  name: string
  fields: InputFields
  multiple?: boolean
}

export type Inputs = Input[]

export type Board = {
  id: string
  name: string
  description: string
  owner: string
  inputs: Inputs
  outputs?: Outputs
  tags?: string[]
}

export type Boards = Board[]
