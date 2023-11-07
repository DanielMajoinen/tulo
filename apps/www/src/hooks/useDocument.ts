import { parse as papaParse } from 'papaparse'
import { useEffect, useState } from 'react'

import { DocumentHooks } from '@/stores/documents'
import { type DocumentDestructured } from '@/stores/documents/client'

type CsvParseOptions = { type: 'csv'; header: boolean }

export function useDocument({ id, parse }: { id?: string; parse?: CsvParseOptions }) {
  const usedDocument = DocumentHooks.useDocument(id!, { skip: !id })

  const [document, setDocument] = useState(
    usedDocument?.getAll() ?? ({ file: {}, filename: '', id: '', userId: '' } as DocumentDestructured)
  )
  const [data, setData] = useState([] as any[])
  const [url, setUrl] = useState(null as string | null)

  useEffect(() => {
    const document = usedDocument?.getAll()
    if (!document || !document.file.url) return

    setDocument(document)
    setUrl(document.file.url)

    if (!parse) return
    papaParse(document.file.url, {
      complete: (results) => setData(results.data),
      download: true,
      header: parse.header
    })
  }, [document, parse, setData, setDocument, usedDocument])

  /**
   * Helper to retrieve the first example value from the data table.
   */
  const getExample = (key: string): string => {
    if (!data.length) return ''

    let row = 0
    while (row < data.length) {
      if (data[row][key]) return data[row][key] as string
      row++
    }

    return ''
  }

  return {
    data,
    getExample,
    id: document.id,
    name: document.filename,
    url,
    ...(parse?.type === 'csv' && parse.header && data.length > 0 ? { headers: Object.keys(data[0]) } : {})
  }
}
