/* eslint-disable sort-keys-fix/sort-keys-fix */ import { collection, schema } from '@verdant-web/store';
import { v4 as uuid } from 'uuid';
const accounts = collection({
    compounds: {},
    fields: {
        id: {
            default: ()=>uuid(),
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
            indexed: true,
            type: 'string',
            unique: false
        },
        currency: {
            indexed: false,
            type: 'string',
            unique: false
        },
        balance: {
            default: 0,
            indexed: false,
            type: 'number',
            unique: false
        }
    },
    name: 'account',
    primaryKey: 'id',
    synthetics: {}
});
export default schema({
    collections: {
        accounts: accounts
    },
    version: 1
});
