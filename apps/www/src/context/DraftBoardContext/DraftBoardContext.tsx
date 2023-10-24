import { createContext, type FunctionComponent, type PropsWithChildren, useContext } from 'react'
import { useStoreWithEqualityFn } from 'zustand/traditional'

import { createDraftBoardStore } from './store'
import { type DraftBoardProviderProps, type DraftBoardStore, type DraftBoardStoreApi } from './types'

export const DraftBoardContext = createContext<DraftBoardStoreApi | null>(null)

export const DraftBoardProvider: FunctionComponent<PropsWithChildren<DraftBoardProviderProps>> = ({ children, ...props }) => {
  return <DraftBoardContext.Provider value={createDraftBoardStore(props)}>{children}</DraftBoardContext.Provider>
}

export function useDraftBoardContext<T>(selector: (state: DraftBoardStore) => T, equalityFn?: (left: T, right: T) => boolean): T {
  const context = useContext(DraftBoardContext)
  if (!context) {
    throw new Error('useDraftBoardContext must be used within DraftBoardProvider')
  }

  return useStoreWithEqualityFn(context, selector, equalityFn)
}
