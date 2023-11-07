/* eslint-disable sort-keys-fix/sort-keys-fix */
import { z } from 'zod'

import { type BoardTemplate } from '@/boards'

export const TransactionHistoryBoardTemplate: BoardTemplate = {
  id: 'transaction-history',
  name: 'Transaction History',
  description: "Track a bank account, credit card, cash, or investment and it's related transactions over time.",
  owner: 'Tulo',
  tags: ['Essentials'],
  inputs: {
    currency: {
      name: 'Currency',
      description: 'The currency of the account.',
      type: 'currency-select',
      validator: z.string().min(1)
    },
    transactions: {
      name: 'Transactions',
      description: 'A list of transactions for the account.',
      type: 'table',
      validator: z.string().min(1),
      properties: {
        date: {
          name: 'Date',
          description: 'The date of the transaction.',
          type: 'text',
          validator: z.string().min(1)
        },
        description: {
          name: 'Description',
          description: 'A description of the transaction.',
          type: 'text',
          validator: z.string().min(1)
        },
        debit: {
          name: 'Debit',
          description: 'The amount of money debited from the account.',
          type: 'currency',
          validator: z.string().min(1)
        },
        credit: {
          name: 'Credit',
          description: 'The amount of money credited to the account.',
          type: 'currency',
          validator: z.string().min(1)
        }
      }
    }
  }
}
