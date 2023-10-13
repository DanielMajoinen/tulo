import { getProviders } from 'next-auth/react'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export const loginProvidersRouter = createTRPCRouter({
  getAllLoginProviders: publicProcedure.query(() => {
    return getProviders()
  })
})
