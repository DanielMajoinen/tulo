import { type InputTemplate } from '@/boards'
import { InputHooks } from '@/stores/inputs'

export function useInput({ id }: { id?: string }) {
  const usedInput = InputHooks.useInput(id!, { skip: !id })
  const input = usedInput?.getAll() ?? null

  return input
    ? {
        id: input.id,
        name: input.name,
        type: input.type as InputTemplate['type'],
        value: input.value
      }
    : null
}
