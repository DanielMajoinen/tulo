/* eslint-disable sort-keys-fix/sort-keys-fix */
import { useSession } from 'next-auth/react'
import { useCallback } from 'react'

import { type Prettify } from '@/types'

import { type BoardInit } from './client'
import { createHooks } from './client/react'

export { ClientDescriptor } from './client'
export { default as migrations } from './migrations'

export default createHooks().withMutations({
  useAddBoard: (client) => {
    const { data } = useSession()

    return useCallback(
      (init: Prettify<Omit<BoardInit, 'userId'>>) => client.boards.put({ ...init, userId: data?.user.id ?? '' }, { undoable: false }),
      [client, data]
    )
  }
})
