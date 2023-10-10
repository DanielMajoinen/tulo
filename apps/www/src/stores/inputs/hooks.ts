/* eslint-disable sort-keys-fix/sort-keys-fix */
import { useSession } from 'next-auth/react'
import { useCallback } from 'react'

import { type Prettify } from '@/types'

import { type InputInit } from './client'
import { createHooks } from './client/react'

export { ClientDescriptor } from './client'
export { default as migrations } from './migrations'

export default createHooks().withMutations({
  useAddInput: (client) => {
    const { data } = useSession()

    return useCallback(
      (init: Prettify<Omit<InputInit, 'userId'>>) => client.inputs.put({ ...init, userId: data?.user.id ?? '' }, { undoable: false }),
      [client, data]
    )
  }
})
