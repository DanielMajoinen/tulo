import { type InputTemplate } from '@/boards'
import { type Validator } from '@/types'

import { type DraftInput } from './types'

export const resolveValidationError = (validator?: Validator, value = '') => {
  const validation = validator ? validator.safeParse(value) : null
  return validation?.success ? null : validation?.error ?? null
}

export const createDraftInputs = (inputs: Record<string, InputTemplate>): Record<string, DraftInput> =>
  Object.fromEntries(
    Object.entries(inputs).map(([id, { properties, validator, ...input }]) => [
      id,
      {
        ...input,
        error: resolveValidationError(validator),
        properties: Object.fromEntries(
          Object.entries(properties ?? {}).map(([id, { validator, ...property }]) => [
            id,
            {
              ...property,
              error: resolveValidationError(validator),
              validator,
              value: ''
            }
          ])
        ),
        validator,
        value: ''
      }
    ])
  )

export const validateInputs = (inputs: Record<string, DraftInput>, callback?: (success: boolean) => void): boolean => {
  const invalidInputs = Object.values(inputs).filter(
    (input) => input.error !== null || ('properties' in input && Object.values(input.properties ?? {}).some((prop) => prop.error !== null))
  )

  const success = invalidInputs.length === 0
  callback?.(success)
  return success
}
