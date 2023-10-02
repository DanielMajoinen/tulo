import { migrate } from '@verdant-web/store'

import v1Schema from '../client/schemaVersions/v1'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default migrate(v1Schema, async ({ mutations }) => {
  // Uncomment below to seed test data
  // mutations.accounts.put({
  //   balance: 478.53,
  //   currency: 'AUD',
  //   id: '1',
  //   name: 'Spendings',
  //   userId: '1'
  // })
  // mutations.accounts.put({
  //   balance: 100000.0,
  //   currency: 'AUD',
  //   id: '2',
  //   name: 'Savings',
  //   userId: '1'
  // })
})
