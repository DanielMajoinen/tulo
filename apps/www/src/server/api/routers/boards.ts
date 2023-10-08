/* eslint-disable sort-keys-fix/sort-keys-fix */
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { type Board } from '@/types'

const boards: Record<string, Board> = {
  accounts: {
    id: 'accounts',
    name: 'Account Balances & Transactions',
    description: 'Track your bank accounts, credit cards, cash, or investments and their related transactions over time.',
    owner: 'Tulo',
    tags: ['Essentials'],
    inputs: [
      {
        id: 'account',
        name: 'Account',
        multiple: true,
        fields: [
          {
            id: 'name',
            name: 'Name',
            type: 'text'
          },
          {
            id: 'currency',
            name: 'Currency',
            options: [
              {
                label: 'USD',
                value: 'usd'
              },
              {
                label: 'EUR',
                value: 'eur'
              },
              {
                label: 'GBP',
                value: 'gbp'
              },
              {
                label: 'CAD',
                value: 'cad'
              },
              {
                label: 'AUD',
                value: 'aud'
              }
            ],
            type: 'select'
          },
          {
            id: 'balance',
            name: 'Balance',
            type: 'number'
          },
          {
            id: 'type',
            name: 'Type',
            options: [
              {
                label: 'Bank',
                value: 'bank'
              },
              {
                label: 'Credit Card',
                value: 'credit-card'
              },
              {
                label: 'Cash',
                value: 'cash'
              },
              {
                label: 'Investment',
                value: 'investment'
              },
              {
                label: 'Other',
                value: 'other'
              }
            ],
            type: 'select'
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
  getAllBoards: protectedProcedure.query(() => {
    return Object.values(boards)
  }),

  getBoard: protectedProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return boards[input.id]
  })
})
