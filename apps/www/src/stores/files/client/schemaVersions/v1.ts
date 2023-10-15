/* eslint-disable sort-keys-fix/sort-keys-fix */
import { collection, schema } from '@verdant-web/store'
import { v4 as uuid } from 'uuid'

const files = collection({
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
    filename: {
      indexed: false,
      type: 'string',
      unique: false
    },
    file: {
      default: undefined,
      indexed: false,
      type: 'file',
      unique: false
    }
  },
  name: 'file',
  primaryKey: 'id',
  synthetics: {}
})

export default schema({
  collections: {
    files: files
  },
  version: 1
})
