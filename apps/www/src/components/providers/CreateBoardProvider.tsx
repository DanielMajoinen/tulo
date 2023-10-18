import { useSession } from 'next-auth/react'
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

type InputType = {
  get: (inputId: string) => 'new' | 'existing'
  set: (inputId: string, type: 'existing' | 'new') => void
}

type UseInputTypesProps = {
  board: Board
}

function useInputTypes({ board }: UseInputTypesProps) {
  const [inputTypes, setInputTypes] = useState(Object.fromEntries(board.inputs.map(({ id }) => [id, 'new' as 'new' | 'existing'])))

  const inputType: InputType = {
    get: useCallback((inputId: string) => inputTypes[inputId] ?? 'new', [inputTypes]),
    set: (inputId: string, type: 'existing' | 'new') => setInputTypes({ ...inputTypes, [inputId]: type })
  }

  return {
    inputType
  }
}

type InputProperties = {
  get: (inputId: string, type?: 'new' | 'existing') => Record<string, string>
  isValid: (inputId: string, type?: 'new' | 'existing') => boolean
  set: (inputId: string, property: string, value: string, options?: { isValid?: boolean }) => void
}

type UseInputPropertiesProps = {
  inputType: InputType
}

function useInputProperties({ inputType }: UseInputPropertiesProps) {
  const { get: getInputType } = inputType

  const [newInputProperties, setNewInputProperties] = useState({} as Record<string, Record<string, string>>)
  const [existingInputProperties, setExistingInputProperties] = useState({} as Record<string, Record<string, string>>)

  const [newInputPropertyValidity, setNewInputPropertyValidity] = useState({} as Record<string, Record<string, boolean>>)
  const [existingInputPropertyValidity, setExistingInputPropertyValidity] = useState({} as Record<string, Record<string, boolean>>)

  const inputProperties: InputProperties = {
    get: useCallback(
      (inputId: string, type?: 'new' | 'existing') =>
        ((type ?? getInputType(inputId)) === 'new' ? newInputProperties[inputId] : existingInputProperties[inputId]) ?? {},
      [existingInputProperties, getInputType, newInputProperties]
    ),
    isValid: useCallback(
      (inputId: string, type?: 'new' | 'existing') =>
        Object.values(
          ((type ?? getInputType(inputId)) === 'new' ? newInputPropertyValidity[inputId] : existingInputPropertyValidity[inputId]) ?? {}
        ).every((value) => value),
      [existingInputPropertyValidity, getInputType, newInputPropertyValidity]
    ),
    set: (inputId: string, property: string, value: string, options?: { isValid?: boolean }) => {
      const isNewInput = getInputType(inputId) === 'new'

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

  return {
    inputProperties
  }
}

type InputValue = {
  display: (inputId: string, type?: 'new' | 'existing') => string
  get: (inputId: string, type?: 'new' | 'existing') => string
  isValid: (inputId: string, type?: 'new' | 'existing') => boolean
  set: (inputId: string, value: string, options?: { displayValue?: string; isValid?: boolean }) => void
}

type UseInputValuesProps = {
  inputType: InputType
}

function useInputValues({ inputType }: UseInputValuesProps) {
  const { get: getInputType } = inputType

  const [newInputValues, setNewInputValues] = useState({} as Record<string, string>)
  const [existingInputValues, setExistingInputValues] = useState({} as Record<string, string>)

  const [newInputDisplayValues, setNewInputDisplayValues] = useState({} as Record<string, string>)
  const [existingInputDisplayValues, setExistingInputDisplayValues] = useState({} as Record<string, string>)

  const [newInputValidity, setNewInputValidity] = useState({} as Record<string, boolean>)
  const [existingInputValidity, setExistingInputValidity] = useState({} as Record<string, boolean>)

  const inputValue: InputValue = {
    display: useCallback(
      (inputId: string, type?: 'new' | 'existing') =>
        ((type ?? getInputType(inputId)) === 'new' ? newInputDisplayValues[inputId] : existingInputDisplayValues[inputId]) ??
        ('' as string),
      [getInputType, newInputDisplayValues, existingInputDisplayValues]
    ),
    get: useCallback(
      (inputId: string, type?: 'new' | 'existing') =>
        ((type ?? getInputType(inputId)) === 'new' ? newInputValues[inputId] : existingInputValues[inputId]) ?? ('' as string),
      [getInputType, newInputValues, existingInputValues]
    ),
    isValid: useCallback(
      (inputId: string, type?: 'new' | 'existing') =>
        ((type ?? getInputType(inputId)) === 'new' ? newInputValidity[inputId] : existingInputValidity[inputId]) ?? true,
      [existingInputValidity, getInputType, newInputValidity]
    ),
    set: (inputId: string, value: string, options?: { displayValue?: string; isValid?: boolean }) => {
      const isNewInput = getInputType(inputId) === 'new'
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

  return {
    inputValue
  }
}

type UseSaveBoardProps = {
  board: Board
  inputType: InputType
  inputValue: InputValue
  inputProperties: InputProperties
}

function useSaveBoard({ board, inputType, inputValue, inputProperties }: UseSaveBoardProps) {
  const { boards, batch: boardsBatchFactory } = BoardHooks.useClient()
  const { inputs, batch: inputsBatchFactory } = InputHooks.useClient()
  const { data: session } = useSession()

  return {
    saveBoard: (name: string): void => {
      const boardsBatch = boardsBatchFactory({ undoable: true })
      const inputsBatch = inputsBatchFactory({ undoable: true })

      try {
        inputsBatch.run(() => {
          board.inputs
            .filter((input) => inputType.get(input.id) === 'new')
            .map((input) =>
              inputs.put({
                displayValue: inputValue.display(input.id),
                name: input.name,
                type: input.type,
                userId: session?.user?.id ?? '',
                value: inputValue.get(input.id)
              })
            )
        })

        boardsBatch.run(() => {
          boards.put({
            inputs: board.inputs.map((input) => ({
              id: input.id,
              properties: inputProperties.get(input.id)
            })),
            name,
            userId: session?.user?.id ?? ''
          })
        })

        boardsBatch.flush()
        inputsBatch.flush()
      } catch (error) {
        boardsBatch.discard()
        inputsBatch.discard()
      }
    }
  }
}

type CreateBoardProviderProps = {
  children: ReactNode
  board: Board
}

export default function CreateBoardProvider({ board, children }: CreateBoardProviderProps) {
  const { inputType } = useInputTypes({ board })
  const { inputProperties } = useInputProperties({ inputType })
  const { inputValue } = useInputValues({ inputType })
  const { saveBoard } = useSaveBoard({ board, inputProperties, inputType, inputValue })

  const [isInputValid, setIsInputValid] = useState(false)

  useEffect(() => {
    setIsInputValid(
      board.inputs
        .filter(({ required }) => required)
        .every(({ id }) => {
          const type = inputType.get(id)
          return inputValue.isValid(id, type) && inputProperties.isValid(id, type)
        })
    )
  }, [board, inputProperties, inputType, inputValue])

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
