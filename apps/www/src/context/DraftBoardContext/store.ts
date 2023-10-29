import { createStore } from 'zustand'

import { useSaveBoard } from '@/hooks/useSaveBoard'
import { store } from '@/utils/store'

import { type DraftBoardProviderProps, type DraftBoardStore, type DraftBoardStoreApi, type DraftValue } from './types'
import { createDraftInputs, resolveValidationError, validateInputs } from './util'

export const createDraftBoardStore = ({ board }: DraftBoardProviderProps): DraftBoardStoreApi =>
  createStore<DraftBoardStore>((set, get) => {
    const inputs = createDraftInputs(board.inputs)
    const isValid = validateInputs(inputs)

    const saveBoard = useSaveBoard()

    const validate = () => {
      validateInputs(get().inputs, (success) => {
        success && store(set, (state) => (state.saveBoard = () => saveBoard(get())))
      })
    }

    const setAndValidate = (selector: (state: DraftBoardStore) => DraftValue | undefined, value: string) => {
      store(set, (state) => {
        const draft = selector(state)
        if (!draft) {
          return
        }

        draft.value = value
        draft.error = draft.validator ? resolveValidationError(draft.validator, value) : null
      })

      validate()
    }

    return {
      inputs,
      name: board.name,
      saveBoard: isValid ? () => saveBoard(get()) : null,
      setInputPropertyValue: (id, property, value) => setAndValidate((state) => state.inputs[id]?.properties[property], value),
      setInputValue: (id, value) => setAndValidate((state) => state.inputs[id], value),
      setName: (name) => store(set, (state) => void (state.name = name))
    }
  })
