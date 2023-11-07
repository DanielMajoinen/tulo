import type { AnyEntity, EntityDestructured, EntityFile, EntityShape, UserInfo } from '@verdant-web/store'
import { type ComponentType, type Context, type ReactNode } from 'react'

import type { Client, ClientDescriptor, Document, DocumentFilter, QueryStatus, Schema } from './index'

type HookConfig<F> = {
  index?: F
  skip?: boolean
  key?: string
}

export interface GeneratedHooks<Presence, Profile> {
  /**
   * Render this context Provider at the top level of your
   * React tree to provide a Client to all hooks.
   */
  Provider: ComponentType<{
    value: ClientDescriptor<Schema>
    children: ReactNode
    sync?: boolean
  }>
  /**
   * Direct access to the React Context, if needed.
   */
  Context: Context<ClientDescriptor<Schema>>
  /** @deprecated use useClient instead */
  useStorage: () => Client<Presence, Profile>
  useClient: () => Client<Presence, Profile>
  useUnsuspendedClient: () => Client<Presence, Profile> | null
  useSelf: () => UserInfo<Profile, Presence>
  usePeerIds: () => string[]
  usePeer: (peerId: string | null) => UserInfo<Profile, Presence> | null
  useFindPeer: (
    query: (peer: UserInfo<Profile, Presence>) => boolean,
    options?: { includeSelf: boolean }
  ) => UserInfo<Profile, Presence> | null
  useFindPeers: (query: (peer: UserInfo<Profile, Presence>) => boolean, options?: { includeSelf: boolean }) => UserInfo<Profile, Presence>[]
  useSyncStatus: () => boolean
  useWatch<T extends AnyEntity<any, any, any> | null>(entity: T): EntityDestructured<T>
  useWatch<T extends AnyEntity<any, any, any> | null, P extends keyof EntityShape<T>>(entity: T, prop: P): EntityDestructured<T>[P]
  useWatch<T extends EntityFile | null>(file: T): string | null
  useUndo(): () => void
  useRedo(): () => void
  useCanUndo(): boolean
  useCanRedo(): boolean
  /**
   * This non-blocking hook declaratively controls sync on/off state.
   * Render it anywhere in your tree and pass it a boolean to turn sync on/off.
   * Since it doesn't trigger Suspense, you can do this in, say, a top-level
   * route component.
   *
   * It must still be rendered within your Provider.
   */
  useSync(isOn: boolean): void

  useDocument(id: string, config?: { skip?: boolean }): Document | null
  useDocumentUnsuspended(id: string, config?: { skip?: boolean }): { data: Document | null; status: QueryStatus }
  useOneDocument: <Config extends HookConfig<DocumentFilter>>(config?: Config) => Document | null
  useOneDocumentsUnsuspended: <Config extends HookConfig<DocumentFilter>>(config?: Config) => { data: Document | null; status: QueryStatus }
  useAllDocuments: <Config extends HookConfig<DocumentFilter>>(config?: Config) => Document[]
  useAllDocumentsUnsuspended: <Config extends HookConfig<DocumentFilter>>(config?: Config) => { data: Document[]; status: QueryStatus }
  useAllDocumentsPaginated: <
    Config extends HookConfig<DocumentFilter> & {
      pageSize?: number
      suspend?: false
    }
  >(
    config?: Config
  ) => [
    Document[],
    {
      next: () => void
      previous: () => void
      setPage: (page: number) => void
      hasNext: boolean
      hasPrevious: boolean
      status: QueryStatus
    }
  ]
  useAllDocumentsInfinite: <
    Config extends HookConfig<DocumentFilter> & {
      pageSize?: number
      suspend?: false
    }
  >(
    config?: Config
  ) => [Document[], { loadMore: () => void; hasMore: boolean; status: QueryStatus }]
}

type HookName = `use${string}`
type HookWithoutClient<Hook extends <TRet>(client: Client) => TRet> = () => ReturnType<Hook>
export function createHooks<
  Presence = any,
  Profile = any,
  Mutations extends {
    [N: HookName]: (client: Client<Presence, Profile>, ...args: any[]) => any
  } = never
>(
  mutations?: Mutations
): GeneratedHooks<Presence, Profile> & {
  withMutations: <
    Mutations extends {
      [Name: HookName]: (client: Client<Presence, Profile>, ...args: any[]) => unknown
    }
  >(
    mutations: Mutations
  ) => GeneratedHooks<Presence, Profile> & {
    [MutHook in keyof Mutations]: HookWithoutClient<Mutations[MutHook]>
  }
}
