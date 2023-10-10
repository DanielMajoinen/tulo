import type schema from './schema'
import type { StorageSchema } from '@verdant-web/common'
import type {
  Client as Storage,
  ClientDescriptorOptions as StorageInitOptions,
  ObjectEntity,
  ListEntity,
  Query,
  ServerSync,
  EntityFile,
  CollectionQueries
} from '@verdant-web/store'
export * from '@verdant-web/store'
export type Schema = typeof schema

interface Collection<Document extends ObjectEntity<any, any>, Snapshot, Init, Filter> {
  put: (init: Init, options?: { undoable?: boolean }) => Promise<Document>
  delete: (id: string, options?: { undoable?: boolean }) => Promise<void>
  deleteAll: (ids: string[], options?: { undoable?: boolean }) => Promise<void>
  get: (id: string) => Query<Document>
  findOne: (filter: Filter) => Query<Document>
  findAll: (filter?: Filter) => Query<Document[]>
  findAllPaginated: (filter?: Filter, pageSize?: number) => Query<Document[], { offset?: number }>
  findAllInfinite: (filter?: Filter, pageSize?: number) => Query<Document[], { offset?: number }>
}

export class Client<Presence = any, Profile = any> {
  readonly inputs: CollectionQueries<Input, InputInit, InputFilter>

  sync: ServerSync<Profile, Presence>
  undoHistory: Storage['undoHistory']
  namespace: Storage['namespace']
  entities: Storage['entities']
  queryStore: Storage['queryStore']
  batch: Storage['batch']
  files: Storage['files']

  close: Storage['close']

  export: Storage['export']
  import: Storage['import']

  subscribe: Storage['subscribe']

  stats: () => Promise<any>
  /**
   * Resets all local data. Use with caution. If this replica
   * is synced, it can restore from the server, but if it is not,
   * the data will be permanently lost.
   */
  __dangerous__resetLocal: Storage['__dangerous__resetLocal']
}

// schema is provided internally. loadInitialData must be revised to pass the typed Client
interface ClientInitOptions<Presence = any, Profile = any> extends Omit<StorageInitOptions<Presence, Profile>, 'schema'> {
  /** WARNING: overriding the schema is dangerous. Use with caution. */
  schema?: StorageSchema
}

export class ClientDescriptor<Presence = any, Profile = any> {
  constructor(init: ClientInitOptions<Presence, Profile>)
  open: () => Promise<Client<Presence, Profile>>
  readonly current: Client<Presence, Profile> | null
  readonly readyPromise: Promise<Client<Presence, Profile>>
  readonly schema: StorageSchema
  readonly namespace: string
  close: () => Promise<void>
}
export type Input = ObjectEntity<InputInit, InputDestructured, InputSnapshot>

export interface InputIdMatchFilter {
  where: 'id'
  equals: string
  order?: 'asc' | 'desc'
}

export interface InputIdRangeFilter {
  where: 'id'
  gte?: string
  gt?: string
  lte?: string
  lt?: string
  order?: 'asc' | 'desc'
}

export interface InputIdStartsWithFilter {
  where: 'id'
  startsWith: string
  order?: 'asc' | 'desc'
}

export interface InputUserIdMatchFilter {
  where: 'userId'
  equals: string
  order?: 'asc' | 'desc'
}

export interface InputUserIdRangeFilter {
  where: 'userId'
  gte?: string
  gt?: string
  lte?: string
  lt?: string
  order?: 'asc' | 'desc'
}

export interface InputUserIdStartsWithFilter {
  where: 'userId'
  startsWith: string
  order?: 'asc' | 'desc'
}

export interface InputTypeMatchFilter {
  where: 'type'
  equals: string
  order?: 'asc' | 'desc'
}

export interface InputTypeRangeFilter {
  where: 'type'
  gte?: string
  gt?: string
  lte?: string
  lt?: string
  order?: 'asc' | 'desc'
}

export interface InputTypeStartsWithFilter {
  where: 'type'
  startsWith: string
  order?: 'asc' | 'desc'
}

export interface InputUserInputsCompoundFilter {
  where: 'user_inputs'
  match: {
    userId?: string
    type?: string
  }
  order: 'asc' | 'desc'
}

export type InputFilter =
  | InputIdMatchFilter
  | InputIdRangeFilter
  | InputIdStartsWithFilter
  | InputUserIdMatchFilter
  | InputUserIdRangeFilter
  | InputUserIdStartsWithFilter
  | InputTypeMatchFilter
  | InputTypeRangeFilter
  | InputTypeStartsWithFilter
  | InputUserInputsCompoundFilter

export type InputDestructured = {
  id: string
  userId: string
  name: string
  type: string
  value: any
  file: InputFile
  properties: any
}
export type InputInit = {
  id?: string
  userId: string
  name: string
  type: string
  value?: any
  file?: InputFileInit
  properties?: any
}
export type InputSnapshot = {
  id: string
  userId: string
  name: string
  type: string
  value: any
  file: InputFileSnapshot
  properties: any
}
/** Input sub-object types */

export type InputId = string
export type InputIdInit = InputId | undefined
export type InputIdSnapshot = InputId
export type InputIdDestructured = InputId
export type InputUserId = string
export type InputUserIdInit = InputUserId
export type InputUserIdSnapshot = InputUserId
export type InputUserIdDestructured = InputUserId
export type InputName = string
export type InputNameInit = InputName
export type InputNameSnapshot = InputName
export type InputNameDestructured = InputName
export type InputType = string
export type InputTypeInit = InputType
export type InputTypeSnapshot = InputType
export type InputTypeDestructured = InputType
export type InputValue = any
export type InputValueInit = InputValue | undefined
export type InputValueSnapshot = InputValue
export type InputValueDestructured = InputValue
export type InputFile = EntityFile
export type InputFileInit = File
export type InputFileDestructured = EntityFile
export type InputFileSnapshot = string
export type InputProperties = any
export type InputPropertiesInit = InputProperties | undefined
export type InputPropertiesSnapshot = InputProperties
export type InputPropertiesDestructured = InputProperties
