import { type BoardInputDefinition } from '@/boards'
import { type Validator } from '@/types'

import { type DraftInput } from './types'

export const resolveValidationError = (validator?: Validator, value = '') => {
  const validation = validator ? validator.safeParse(value) : null
  return validation?.success ? null : validation?.error ?? null
}

export const createDraftInputs = (inputs: BoardInputDefinition[]): Record<string, DraftInput> =>
  Object.fromEntries(
    inputs.map((definition) => [
      definition.id,
      {
        description: definition.description,
        error: resolveValidationError(definition.validator),
        name: definition.name,
        properties:
          'properties' in definition
            ? Object.fromEntries(
                definition.properties.map((property) => [
                  property.id,
                  {
                    description: property.description,
                    error: resolveValidationError(property.validator),
                    name: property.name,
                    type: property.type,
                    validator: property.validator,
                    value: ''
                  }
                ])
              )
            : {},
        type: definition.type,
        validator: definition.validator,
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
