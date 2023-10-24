import { type z } from 'zod'

export type Prettify<T> = { [K in keyof T]: T[K] } & {}

export type Set<T> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean | undefined) => void

export type Validator = { safeParse: (data: unknown) => z.SafeParseReturnType<any, any> }
