import { createContext, type FunctionComponent, type PropsWithChildren, useContext } from 'react'
import { useStoreWithEqualityFn } from 'zustand/traditional'

import { createBoardStore } from './store'
import { type BoardProviderProps, type BoardStore, type BoardStoreApi } from './types'

const BoardContext = createContext<BoardStoreApi | null>(null)

export const BoardProvider: FunctionComponent<PropsWithChildren<BoardProviderProps>> = ({ children, ...props }) => {
  return <BoardContext.Provider value={createBoardStore(props)}>{children}</BoardContext.Provider>
}

export function useBoardContext<T>(selector: (state: BoardStore) => T, equalityFn?: (left: T, right: T) => boolean): T {
  const context = useContext(BoardContext)
  if (!context) {
    throw new Error('useBoardContext must be used within BoardProvider')
  }

  return useStoreWithEqualityFn(context, selector, equalityFn)
}
