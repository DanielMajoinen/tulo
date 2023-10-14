/* eslint-disable sort-keys-fix/sort-keys-fix */
import { useSession } from 'next-auth/react'

import InputHooks from '@/stores/inputs'

export function useAllUserInputsByType() {
  const { data } = useSession()

  const allUserInputs = InputHooks.useAllInputs({
    index: {
      where: 'userId',
      equals: data?.user.id
    }
  })

  const all = allUserInputs.map((userInput) => userInput.getAll())
  const userInputs = Object.fromEntries(
    [...new Set(all.map(({ type }) => type))].map((type) => [type, all.filter((userInput) => userInput.type === type)])
  )

  return {
    getUserInputValue: <T>(id: string) => all.find((userInput) => userInput.id === id)?.value as T | undefined,
    getUserInputsByType: (type: string) => userInputs[type] ?? []
  }
}