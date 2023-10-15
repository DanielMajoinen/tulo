/* eslint-disable sort-keys-fix/sort-keys-fix */
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { type Board } from '@/types'

const boards: Record<string, Board> = {
  'tansaction-history': {
    id: 'tansaction-history',
    name: 'Transaction History',
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
        id: 'transactions',
        name: 'Transactions',
        description: 'A list of transactions for the account.',
        required: true,
        type: 'table',
        columns: [
          {
            id: 'date',
            name: 'Date',
            description: 'The date of the transaction.',
            type: 'text',
            required: true
          },
          {
            id: 'description',
            name: 'Description',
            description: 'A description of the transaction.',
            type: 'text',
            required: true
          },
          {
            id: 'debit',
            name: 'Debit',
            description: 'The amount of money debited from the account.',
            type: 'currency',
            required: true
          },
          {
            id: 'credit',
            name: 'Credit',
            description: 'The amount of money credited to the account.',
            type: 'currency',
            required: true
          }
        ]
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
  getAllBoards: publicProcedure.query(() => {
    return Object.values(boards)
  }),

  getBoard: publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return boards[input.id]
  })
})
