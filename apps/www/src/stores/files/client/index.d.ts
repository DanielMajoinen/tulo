import type { StorageSchema } from '@verdant-web/common'
import type {
  Client as Storage,
  ClientDescriptorOptions as StorageInitOptions,
  CollectionQueries,
  EntityFile,
  ListEntity,
  ObjectEntity,
  Query,
  ServerSync
} from '@verdant-web/store'

import type schema from './schema'

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
  readonly files: CollectionQueries<File, FileInit, FileFilter>

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
export type File = ObjectEntity<FileInit, FileDestructured, FileSnapshot>

export interface FileIdMatchFilter {
  where: 'id'
  equals: string
  order?: 'asc' | 'desc'
}

export interface FileIdRangeFilter {
  where: 'id'
  gte?: string
  gt?: string
  lte?: string
  lt?: string
  order?: 'asc' | 'desc'
}

export interface FileIdStartsWithFilter {
  where: 'id'
  startsWith: string
  order?: 'asc' | 'desc'
}

export interface FileUserIdMatchFilter {
  where: 'userId'
  equals: string
  order?: 'asc' | 'desc'
}

export interface FileUserIdRangeFilter {
  where: 'userId'
  gte?: string
  gt?: string
  lte?: string
  lt?: string
  order?: 'asc' | 'desc'
}

export interface FileUserIdStartsWithFilter {
  where: 'userId'
  startsWith: string
  order?: 'asc' | 'desc'
}
export type FileFilter =
  | FileIdMatchFilter
  | FileIdRangeFilter
  | FileIdStartsWithFilter
  | FileUserIdMatchFilter
  | FileUserIdRangeFilter
  | FileUserIdStartsWithFilter

export type FileDestructured = {
  id: string
  userId: string
  filename: string
  file: FileFile
}
export type FileInit = {
  id?: string
  userId: string
  filename: string
  file?: FileFileInit
}
export type FileSnapshot = {
  id: string
  userId: string
  filename: string
  file: FileFileSnapshot
}
/** File sub-object types */

export type FileId = string
export type FileIdInit = FileId | undefined
export type FileIdSnapshot = FileId
export type FileIdDestructured = FileId
export type FileUserId = string
export type FileUserIdInit = FileUserId
export type FileUserIdSnapshot = FileUserId
export type FileUserIdDestructured = FileUserId
export type FileFilename = string
export type FileFilenameInit = FileFilename
export type FileFilenameSnapshot = FileFilename
export type FileFilenameDestructured = FileFilename
export type FileFile = EntityFile
export type FileFileInit = File
export type FileFileDestructured = EntityFile
export type FileFileSnapshot = string
