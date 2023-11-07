/* eslint-disable sort-keys-fix/sort-keys-fix */
import { collection, schema } from '@verdant-web/store'
import { v4 as uuid } from 'uuid'

const boards = collection({
  compounds: {},
  fields: {
    id: {
      default: () => uuid(),
      indexed: true,
      type: 'string',
      unique: true
    },
    templateId: {
      indexed: false,
      type: 'string',
      unique: false
    },
    userId: {
      indexed: true,
      type: 'string',
      unique: false
    },
    name: {
      indexed: false,
      type: 'string',
      unique: false
    },
    inputs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          properties: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string'
                },
                value: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  },
  name: 'board',
  primaryKey: 'id',
  synthetics: {}
})

export default schema({
  collections: {
    boards: boards
  },
  version: 1
})
