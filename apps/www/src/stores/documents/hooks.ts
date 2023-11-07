import { useSession } from 'next-auth/react'
import { useCallback } from 'react'

import { type Prettify } from '@/types'

import { type DocumentInit } from './client'
import { createHooks } from './client/react'

export { ClientDescriptor } from './client'
export { default as migrations } from './migrations'

export default createHooks().withMutations({
  useAddDocument: (client) => {
    const { data } = useSession()

    return useCallback(
      (init: Prettify<Omit<DocumentInit, 'userId'>>) => client.documents.put({ ...init, userId: data?.user.id ?? '' }, { undoable: false }),
      [client, data]
    )
  }
})
