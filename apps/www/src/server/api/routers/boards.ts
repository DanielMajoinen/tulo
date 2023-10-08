/* eslint-disable sort-keys-fix/sort-keys-fix */
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { type Boards } from '@/types'

export const boardsRouter = createTRPCRouter({
  getAllBoards: protectedProcedure.query(() => {
    // TODO: Get boards from dedicated microservice
    const boards: Boards = [
      // Accounts
      {
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
      // Loans
      {
        id: 'loans',
        name: 'Loans & Repayments',
        description: "Track your home loans, car loans, student loans, or any other type of loan and it's related repayments over time.",
        owner: 'Tulo',
        tags: ['Essentials'],
        inputs: []
      }
    ]

    return boards
  }),

  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`
    }
  })
})
