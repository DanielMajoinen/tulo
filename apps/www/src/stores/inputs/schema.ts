/* eslint-disable sort-keys-fix/sort-keys-fix */
import { collection, schema } from '@verdant-web/store'
import { v4 as uuid } from 'uuid'

const inputs = collection({
  compounds: {
    user_inputs: {
      of: ['userId', 'type']
    }
  },
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
    type: {
      indexed: true,
      type: 'string',
      unique: false
    },
    value: {
      default: '',
      indexed: false,
      type: 'any',
      unique: false
    },
    file: {
      default: undefined,
      indexed: false,
      type: 'file',
      unique: false
    },
    properties: {
      default: {},
      indexed: false,
      type: 'any',
      unique: false
    }
  },
  name: 'input',
  primaryKey: 'id',
  synthetics: {}
})

export default schema({
  collections: {
    inputs: inputs
  },
  version: 1
})
