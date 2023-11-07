import type { StorageSchema } from '@verdant-web/common'
import type {
  Client as Storage,
  ClientDescriptorOptions as StorageInitOptions,
  CollectionQueries,
  EntityFile,
  ObjectEntity,
  Query,
  ServerSync
} from '@verdant-web/store'

import type schema from './schema'

export type Schema = typeof schema

interface Collection<Document extends ObjectEntity<any, any>, Init, Filter> {
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
  readonly documents: CollectionQueries<Document, DocumentInit, DocumentFilter>

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
export type Document = ObjectEntity<DocumentInit, DocumentDestructured, DocumentSnapshot>

export interface DocumentIdMatchFilter {
  where: 'id'
  equals: string
  order?: 'asc' | 'desc'
}

export interface DocumentIdRangeFilter {
  where: 'id'
  gte?: string
  gt?: string
  lte?: string
  lt?: string
  order?: 'asc' | 'desc'
}

export interface DocumentIdStartsWithFilter {
  where: 'id'
  startsWith: string
  order?: 'asc' | 'desc'
}

export interface DocumentUserIdMatchFilter {
  where: 'userId'
  equals: string
  order?: 'asc' | 'desc'
}

export interface DocumentUserIdRangeFilter {
  where: 'userId'
  gte?: string
  gt?: string
  lte?: string
  lt?: string
  order?: 'asc' | 'desc'
}

export interface DocumentUserIdStartsWithFilter {
  where: 'userId'
  startsWith: string
  order?: 'asc' | 'desc'
}
export type DocumentFilter =
  | DocumentIdMatchFilter
  | DocumentIdRangeFilter
  | DocumentIdStartsWithFilter
  | DocumentUserIdMatchFilter
  | DocumentUserIdRangeFilter
  | DocumentUserIdStartsWithFilter

export type DocumentDestructured = {
  id: string
  userId: string
  filename: string
  file: DocumentFile
}
export type DocumentInit = {
  id?: string
  userId: string
  filename: string
  file?: DocumentFileInit
}
export type DocumentSnapshot = {
  id: string
  userId: string
  filename: string
  file: DocumentFileSnapshot
}
/** Document sub-object types */

export type DocumentId = string
export type DocumentIdInit = DocumentId | undefined
export type DocumentIdSnapshot = DocumentId
export type DocumentIdDestructured = DocumentId
export type DocumentUserId = string
export type DocumentUserIdInit = DocumentUserId
export type DocumentUserIdSnapshot = DocumentUserId
export type DocumentUserIdDestructured = DocumentUserId
export type DocumentFilename = string
export type DocumentFilenameInit = DocumentFilename
export type DocumentFilenameSnapshot = DocumentFilename
export type DocumentFilenameDestructured = DocumentFilename
export type DocumentFile = EntityFile
export type DocumentFileInit = File
export type DocumentFileDestructured = EntityFile
export type DocumentFileSnapshot = string
