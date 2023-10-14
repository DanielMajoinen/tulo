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
      type: 'map',
      values: {
        type: 'string',
        unique: false
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
