import type { StorageSchema } from '@verdant-web/common'
import type {
  Client as Storage,
  ClientDescriptorOptions as StorageInitOptions,
  CollectionQueries,
  ListEntity,
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
  readonly boards: CollectionQueries<Board, BoardInit, BoardFilter>

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
export type Board = ObjectEntity<BoardInit, BoardDestructured, BoardSnapshot>

export interface BoardIdMatchFilter {
  where: 'id'
  equals: string
  order?: 'asc' | 'desc'
}

export interface BoardIdRangeFilter {
  where: 'id'
  gte?: string
  gt?: string
  lte?: string
  lt?: string
  order?: 'asc' | 'desc'
}

export interface BoardIdStartsWithFilter {
  where: 'id'
  startsWith: string
  order?: 'asc' | 'desc'
}

export interface BoardUserIdMatchFilter {
  where: 'userId'
  equals: string
  order?: 'asc' | 'desc'
}

export interface BoardUserIdRangeFilter {
  where: 'userId'
  gte?: string
  gt?: string
  lte?: string
  lt?: string
  order?: 'asc' | 'desc'
}

export interface BoardUserIdStartsWithFilter {
  where: 'userId'
  startsWith: string
  order?: 'asc' | 'desc'
}
export type BoardFilter =
  | BoardIdMatchFilter
  | BoardIdRangeFilter
  | BoardIdStartsWithFilter
  | BoardUserIdMatchFilter
  | BoardUserIdRangeFilter
  | BoardUserIdStartsWithFilter

export type BoardDestructured = {
  id: string
  templateId: string
  userId: string
  name: string
  inputs: BoardInputs
}
export type BoardInit = {
  id?: string
  templateId: string
  userId: string
  name: string
  inputs?: BoardInputsInit
}
export type BoardSnapshot = {
  id: string
  templateId: string
  userId: string
  name: string
  inputs: BoardInputsSnapshot
}
/** Board sub-object types */

export type BoardId = string
export type BoardIdInit = BoardId | undefined
export type BoardIdSnapshot = BoardId
export type BoardIdDestructured = BoardId
export type BoardTemplateId = string
export type BoardTemplateIdInit = BoardTemplateId
export type BoardTemplateIdSnapshot = BoardTemplateId
export type BoardTemplateIdDestructured = BoardTemplateId
export type BoardUserId = string
export type BoardUserIdInit = BoardUserId
export type BoardUserIdSnapshot = BoardUserId
export type BoardUserIdDestructured = BoardUserId
export type BoardName = string
export type BoardNameInit = BoardName
export type BoardNameSnapshot = BoardName
export type BoardNameDestructured = BoardName
export type BoardInputs = ListEntity<BoardInputsInit, BoardInputsDestructured, BoardInputsSnapshot>
export type BoardInputsInit = Array<BoardInputsItemInit>
export type BoardInputsDestructured = Array<BoardInputsItem>
export type BoardInputsSnapshot = Array<BoardInputsItemSnapshot>
export type BoardInputsItem = ObjectEntity<BoardInputsItemInit, BoardInputsItemDestructured, BoardInputsItemSnapshot>
export type BoardInputsItemInit = {
  id: string
  properties?: BoardInputsItemPropertiesInit
}
export type BoardInputsItemDestructured = {
  id: string
  properties: BoardInputsItemProperties
}
export type BoardInputsItemSnapshot = {
  id: string
  properties: BoardInputsItemPropertiesSnapshot
}
export type BoardInputsItemId = string
export type BoardInputsItemIdInit = BoardInputsItemId
export type BoardInputsItemIdSnapshot = BoardInputsItemId
export type BoardInputsItemIdDestructured = BoardInputsItemId
export type BoardInputsItemProperties = ListEntity<
  BoardInputsItemPropertiesInit,
  BoardInputsItemPropertiesDestructured,
  BoardInputsItemPropertiesSnapshot
>
export type BoardInputsItemPropertiesInit = Array<BoardInputsItemPropertiesItemInit>
export type BoardInputsItemPropertiesDestructured = Array<BoardInputsItemPropertiesItem>
export type BoardInputsItemPropertiesSnapshot = Array<BoardInputsItemPropertiesItemSnapshot>
export type BoardInputsItemPropertiesItem = ObjectEntity<
  BoardInputsItemPropertiesItemInit,
  BoardInputsItemPropertiesItemDestructured,
  BoardInputsItemPropertiesItemSnapshot
>
export type BoardInputsItemPropertiesItemInit = {
  id: string
  value: string
}
export type BoardInputsItemPropertiesItemDestructured = {
  id: string
  value: string
}
export type BoardInputsItemPropertiesItemSnapshot = {
  id: string
  value: string
}
export type BoardInputsItemPropertiesItemId = string
export type BoardInputsItemPropertiesItemIdInit = BoardInputsItemPropertiesItemId
export type BoardInputsItemPropertiesItemIdSnapshot = BoardInputsItemPropertiesItemId
export type BoardInputsItemPropertiesItemIdDestructured = BoardInputsItemPropertiesItemId
export type BoardInputsItemPropertiesItemValue = string
export type BoardInputsItemPropertiesItemValueInit = BoardInputsItemPropertiesItemValue
export type BoardInputsItemPropertiesItemValueSnapshot = BoardInputsItemPropertiesItemValue
export type BoardInputsItemPropertiesItemValueDestructured = BoardInputsItemPropertiesItemValue
