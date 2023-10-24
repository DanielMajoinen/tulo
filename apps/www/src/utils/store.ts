import { produce } from 'immer'

import { type Set } from '@/types'

export const store = <T>(set: Set<T>, action: (store: T) => void) => {
  set(
    produce((store) => {
      action(store)
    })
  )
}
