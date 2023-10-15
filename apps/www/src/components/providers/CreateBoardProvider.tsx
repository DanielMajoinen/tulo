import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react'

import BoardHooks from '@/stores/boards'
import InputHooks from '@/stores/inputs'
import { type Board } from '@/types'

const CreateBoardContext = createContext({
  board: {} as Board,
  inputProperties: {
    get: (_inputId: string, _type?: 'new' | 'existing') => ({}) as Record<string, string>,
    set: (_inputId: string, _property: string, _value: string, _options?: { isValid?: boolean }) => {}
  },
  inputType: {
    get: (_inputId: string) => 'new' as 'new' | 'existing',
    set: (_inputId: string, _type: 'existing' | 'new') => {}
  },
  inputValue: {
    display: (_inputId: string, _type?: 'new' | 'existing') => '' as string,
    get: (_inputId: string, _type?: 'new' | 'existing') => '' as string,
    set: (_inputId: string, _value: string, _options?: { displayValue?: string; isValid?: boolean }) => {}
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
  const [newInputProperties, setNewInputProperties] = useState({} as Record<string, Record<string, string>>)
  const [existingInputProperties, setExistingInputProperties] = useState({} as Record<string, Record<string, string>>)

  const [newInputPropertyValidity, setNewInputPropertyValidity] = useState({} as Record<string, Record<string, boolean>>)
  const [existingInputPropertyValidity, setExistingInputPropertyValidity] = useState({} as Record<string, Record<string, boolean>>)

  const [newInputValues, setNewInputValues] = useState({} as Record<string, string>)
  const [existingInputValues, setExistingInputValues] = useState({} as Record<string, string>)

  const [newInputDisplayValues, setNewInputDisplayValues] = useState({} as Record<string, string>)
  const [existingInputDisplayValues, setExistingInputDisplayValues] = useState({} as Record<string, string>)

  const [newInputValidity, setNewInputValidity] = useState({} as Record<string, boolean>)
  const [existingInputValidity, setExistingInputValidity] = useState({} as Record<string, boolean>)

  const [isInputValid, setIsInputValid] = useState(false)

  const [inputTypes, setInputTypes] = useState(Object.fromEntries(board.inputs.map(({ id }) => [id, 'new' as 'new' | 'existing'])))

  const inputProperties = {
    get: useCallback(
      (inputId: string, type?: 'new' | 'existing') =>
        ((type ?? inputTypes[inputId]) === 'new' ? newInputProperties[inputId] : existingInputProperties[inputId]) ?? {},
      [existingInputProperties, inputTypes, newInputProperties]
    ),
    set: (inputId: string, property: string, value: string, options?: { isValid?: boolean }) => {
      const isNewInput = inputTypes[inputId] === 'new'

      // Set property validity
      isNewInput
        ? setNewInputPropertyValidity({
            ...newInputPropertyValidity,
            [inputId]: { ...newInputPropertyValidity[inputId], [property]: options?.isValid ?? true }
          })
        : setExistingInputPropertyValidity({
            ...existingInputPropertyValidity,
            [inputId]: { ...existingInputPropertyValidity[inputId], [property]: options?.isValid ?? true }
          })

      // Set property value
      isNewInput
        ? setNewInputProperties({ ...newInputProperties, [inputId]: { ...newInputProperties[inputId], [property]: value } })
        : setExistingInputProperties({ ...existingInputProperties, [inputId]: { ...existingInputProperties[inputId], [property]: value } })
    }
  }

  const inputType = {
    get: useCallback((inputId: string) => inputTypes[inputId] ?? 'new', [inputTypes]),
    set: (inputId: string, type: 'existing' | 'new') => setInputTypes({ ...inputTypes, [inputId]: type })
  }

  const inputValue = {
    display: useCallback(
      (inputId: string, type?: 'new' | 'existing') =>
        ((type ?? inputTypes[inputId]) === 'new' ? newInputDisplayValues[inputId] : existingInputDisplayValues[inputId]) ?? ('' as string),
      [inputTypes, newInputDisplayValues, existingInputDisplayValues]
    ),
    get: useCallback(
      (inputId: string, type?: 'new' | 'existing') =>
        ((type ?? inputTypes[inputId]) === 'new' ? newInputValues[inputId] : existingInputValues[inputId]) ?? ('' as string),
      [inputTypes, newInputValues, existingInputValues]
    ),
    set: (inputId: string, value: string, options?: { displayValue?: string; isValid?: boolean }) => {
      const isNewInput = inputTypes[inputId] === 'new'
      const isValid = options?.isValid ?? value !== ''

      // Set validity
      isNewInput
        ? setNewInputValidity({ ...newInputValidity, [inputId]: isValid })
        : setExistingInputValidity({ ...existingInputValidity, [inputId]: isValid })

      // Set display value
      isNewInput
        ? setNewInputDisplayValues({ ...newInputDisplayValues, [inputId]: options?.displayValue ?? value })
        : setExistingInputDisplayValues({ ...existingInputDisplayValues, [inputId]: options?.displayValue ?? value })

      // Set value
      isNewInput
        ? setNewInputValues({ ...newInputValues, [inputId]: value })
        : setExistingInputValues({ ...existingInputValues, [inputId]: value })
    }
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

  const { get: getInputType } = inputType

  useEffect(() => {
    setIsInputValid(
      board.inputs
        .filter(({ required }) => required)
        .every(({ id }) =>
          getInputType(id) === 'new'
            ? newInputValidity[id] && Object.values(newInputPropertyValidity[id] ?? {}).every((value) => value)
            : existingInputValidity[id] && Object.values(existingInputPropertyValidity[id] ?? {}).every((value) => value)
        )
    )
  }, [board, existingInputValidity, existingInputPropertyValidity, getInputType, newInputValidity, newInputPropertyValidity])

  return (
    <CreateBoardContext.Provider
      value={{
        board,
        inputProperties,
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
