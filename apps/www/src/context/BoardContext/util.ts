import _ from 'lodash'

import { Templates } from '@/boards'
import { useInput } from '@/hooks/useInput'
import { type BoardDestructured, type BoardInputsItemProperties } from '@/stores/boards/client'

import { type InputContext, type PropertyContext } from './types'

const properties = (boardId: string, inputId: string, properties?: BoardInputsItemProperties): Record<string, PropertyContext> => {
  return Object.fromEntries(
    (properties ?? [])
      .map(({ get }) => {
        const propertyId = get('id')
        const template = Templates.get.property({ boardId, inputId, propertyId })

        return template
          ? [
              propertyId,
              {
                id: propertyId,
                name: template.name,
                template: _.omit(template, ['type']),
                value: get('value')
              }
            ]
          : null
      })
      .filter(Boolean) as [string, PropertyContext][]
  )
}

export const Inputs = {
  fromBoard: (board: BoardDestructured): Record<string, InputContext> => {
    return Object.fromEntries(
      (board.inputs ?? [])
        .map(({ get }) => {
          const inputId = get('id')
          const input = useInput({ id: inputId })
          const template = Templates.get.input({ boardId: board.templateId, inputId })

          return input && template
            ? [
                inputId,
                {
                  id: inputId,
                  name: input.name,
                  properties: properties(board.templateId, inputId, get('properties')),
                  template: _.omit(template, ['properties']),
                  value: input.value
                }
              ]
            : null
        })
        .filter(Boolean) as [string, InputContext][]
    )
  }
}
