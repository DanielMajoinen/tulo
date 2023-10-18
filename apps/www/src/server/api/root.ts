import { boardsRouter } from '@/server/api/routers/boards'
import { loginProvidersRouter } from '@/server/api/routers/loginProviders'
import { createTRPCRouter } from '@/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  boards: boardsRouter,
  loginProviders: loginProvidersRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
