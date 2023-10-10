/* eslint-disable sort-keys-fix/sort-keys-fix */
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { type Board } from '@/types'

const boards: Record<string, Board> = {
  account: {
    id: 'account',
    name: 'Account Balance & Transactions',
    description: "Track a bank account, credit card, cash, or investment and it's related transactions over time.",
    owner: 'Tulo',
    tags: ['Essentials'],
    inputs: [
      {
        id: 'currency',
        name: 'Currency',
        description: 'The currency of the account.',
        type: 'currency-select',
        required: true
      },
      {
        id: 'balance',
        name: 'Balance',
        description: 'The current balance of the account.',
        type: 'currency',
        required: true
      }
    ]
  },
  loans: {
    id: 'loans',
    name: 'Loans & Repayments',
    description: "Track your home loans, car loans, student loans, or any other type of loan and it's related repayments over time.",
    owner: 'Tulo',
    tags: ['Essentials'],
    inputs: []
  }
}

// TODO: Get boards from dedicated microservice
export const boardsRouter = createTRPCRouter({
  getAllBoards: protectedProcedure.query(() => {
    return Object.values(boards)
  }),

  getBoard: protectedProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return boards[input.id]
  })
})
