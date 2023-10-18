import { getProviders } from 'next-auth/react'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export const loginProvidersRouter = createTRPCRouter({
  all: publicProcedure.query(() => getProviders())
})
