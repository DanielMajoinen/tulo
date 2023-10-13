import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

import { type Board } from '@/types'

type InputValues = Record<
  string,
  {
    existing: string
    new: string
    type: 'new' | 'existing'
  }
>

const CreateBoardContext = createContext({
  board: {} as Board,
  changeInputType: (_inputId: string, _type: 'existing' | 'new') => {},
  changeInputValue: (_inputId: string, _value: string) => {},
  getInputType: (_inputId: string) => 'new' as 'new' | 'existing',
  getInputValue: (_inputId: string) => '' as string,
  isInputValid: false
})

export function useCreateBoardContext() {
  const context = useContext(CreateBoardContext)
  if (!context) {
    throw new Error('useCreateBoardContext must be used within CreateBoardProvider')
  }

  return context
}

type CreateBoardProviderProps = {
  children: ReactNode
  board: Board
}

export default function CreateBoardProvider({ board, children }: CreateBoardProviderProps) {
  const defaults = { existing: '', new: '', type: 'new' as 'new' }

  const [isValid, setIsValid] = useState(false)
  const [values, setValues] = useState<InputValues>(Object.fromEntries(board.inputs.map(({ id }) => [id, defaults])))

  const changeInputType = (inputId: string, type: 'existing' | 'new') =>
    setValues({
      ...values,
      [inputId]: {
        ...(values[inputId] ?? defaults),
        type
      }
    })

  const changeInputValue = (id: string, value: string) =>
    setValues({
      ...values,
      [id]: {
        existing: values[id]?.type === 'existing' ? value : values[id]?.existing ?? '',
        new: values[id]?.type === 'new' ? value : values[id]?.new ?? '',
        type: values[id]?.type ?? 'new'
      }
    })

  const getInputType = (inputId: string) => {
    return (values[inputId] ?? defaults).type
  }

  const getInputValue = (inputId: string) => {
    const val = values[inputId] ?? defaults
    return val[val.type]
  }

  useEffect(() => {
    setIsValid(
      board.inputs
        .filter(({ required }) => required)
        .every(({ id }) => {
          const value = values[id]
          return (value?.type === 'new' && value?.new) || (value?.type === 'existing' && value?.existing)
        })
    )
  }, [board, values])

  const providerValue = {
    board,
    changeInputType,
    changeInputValue,
    getInputType,
    getInputValue,
    isInputValid: isValid
  }

  return <CreateBoardContext.Provider value={providerValue}>{children}</CreateBoardContext.Provider>
}
