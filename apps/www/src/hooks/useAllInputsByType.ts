/* eslint-disable sort-keys-fix/sort-keys-fix */
import { useSession } from 'next-auth/react'

import { InputHooks } from '@/stores/inputs'

export function useAllInputsByType() {
  const { data } = useSession()

  const all = InputHooks.useAllInputs({
    index: {
      where: 'userId',
      equals: data?.user.id
    }
  }).map((userInput) => userInput.getAll())

  const byType = Object.fromEntries(
    [...new Set(all.map(({ type }) => type))].map((type) => [type, all.filter((userInput) => userInput.type === type)])
  )

  return {
    getInputValue: <T>(inputId: string) => all.find((userInput) => userInput.id === inputId)?.value as T | undefined,
    getInputsByType: (type: string) => byType[type] ?? []
  }
}
