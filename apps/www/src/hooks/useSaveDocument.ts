import { type ChangeEvent } from 'react'

import { DocumentHooks } from '@/stores/documents'
import { type Document, type DocumentDestructured } from '@/stores/documents/client'

/**
 * Helper to store a file in the IndexDB.
 */
export const useSaveDocument = () => {
  const addDocument = DocumentHooks.useAddDocument()

  return ({ target }: ChangeEvent<HTMLInputElement>, callback?: (document: DocumentDestructured) => void) => {
    const file = target.files?.[0]
    if (!file) return

    addDocument({
      file,
      filename: file.name
    }).then((document: Document) => callback?.(document.getAll()))
  }
}
