/* eslint-disable sort-keys-fix/sort-keys-fix */
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { type Board, type Prettify } from '@/types'

type BoardDto = Prettify<Omit<Board, 'id'>>

const boards: Record<string, BoardDto> = {
  'tansaction-history': {
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
        properties: [
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
    return Object.entries(boards).map(([id, board]) => ({ id, ...board }))
  }),

  getBoard: protectedProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return boards[input.id]
  })
})
