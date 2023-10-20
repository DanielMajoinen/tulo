/* eslint-disable sort-keys-fix/sort-keys-fix */
import { z } from 'zod'

import { TransactionHistoryBoard } from '@/boards/transaction-history'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const boardsRouter = createTRPCRouter({
  all: protectedProcedure.query(() => {
    return [TransactionHistoryBoard]
  }),

  get: protectedProcedure.input(z.object({ id: z.string() })).query(() => {
    return TransactionHistoryBoard
  })
})
