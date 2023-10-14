import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react'

import BoardHooks from '@/stores/boards'
import InputHooks from '@/stores/inputs'
import { type Board } from '@/types'

const CreateBoardContext = createContext({
  board: {} as Board,
  inputType: {
    get: (_inputId: string) => 'new' as 'new' | 'existing',
    set: (_inputId: string, _type: 'existing' | 'new') => {}
  },
  inputValue: {
    get: (_inputId: string, _type?: 'new' | 'existing') => '' as string,
    set: (_inputId: string, _value: string) => {}
  },
  isInputValid: false,
  saveBoard: (_name: string) => {}
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
  const [newInputValues, setNewInputValues] = useState({} as Record<string, string>)
  const [existingInputValues, setExistingInputValues] = useState({} as Record<string, string>)
  const [inputTypes, setInputTypes] = useState(Object.fromEntries(board.inputs.map(({ id }) => [id, 'new' as 'new' | 'existing'])))
  const [isInputValid, setIsInputValid] = useState(false)

  const inputType = {
    get: useCallback((inputId: string) => inputTypes[inputId] ?? 'new', [inputTypes]),
    set: (inputId: string, type: 'existing' | 'new') => setInputTypes({ ...inputTypes, [inputId]: type })
  }

  const inputValue = {
    get: useCallback(
      (inputId: string, type?: 'new' | 'existing') =>
        ((type ?? inputTypes[inputId]) === 'new' ? newInputValues[inputId] : existingInputValues[inputId]) ?? ('' as string),
      [inputTypes, newInputValues, existingInputValues]
    ),
    set: (inputId: string, value: string) =>
      inputTypes[inputId] === 'new'
        ? setNewInputValues({ ...newInputValues, [inputId]: value })
        : setExistingInputValues({ ...existingInputValues, [inputId]: value })
  }

  const { get: getInputValue } = inputValue

  const db = {
    addBoard: BoardHooks.useAddBoard(),
    addInput: InputHooks.useAddInput()
  }

  const saveBoard = (name: string) => {
    board.inputs
      .filter((input) => inputType.get(input.id) === 'new')
      .map((input) =>
        db.addInput({
          name,
          type: input.type,
          value: getInputValue(input.id)
        })
      )

    db.addBoard({
      inputs: Object.fromEntries(board.inputs.map(({ id }) => [id, getInputValue(id)])),
      name
    })
  }

  useEffect(() => {
    setIsInputValid(board.inputs.filter(({ required }) => required).every(({ id }) => getInputValue(id)))
  }, [board, getInputValue])

  return (
    <CreateBoardContext.Provider
      value={{
        board,
        inputType,
        inputValue,
        isInputValid,
        saveBoard
      }}
    >
      {children}
    </CreateBoardContext.Provider>
  )
}
