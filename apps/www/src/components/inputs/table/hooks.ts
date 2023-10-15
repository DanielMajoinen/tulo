import { parse as papaParse } from 'papaparse'
import { type ChangeEvent, useEffect, useState } from 'react'

import FileHooks from '@/stores/files'
import { type File, type FileDestructured } from '@/stores/files/client'

type CsvParseOptions = { type: 'csv'; header: boolean }

export function useFile({ id, parse }: { id?: string; parse?: CsvParseOptions }) {
  const usedFile = FileHooks.useFile(id!, { skip: !id })

  const [file, setFile] = useState(usedFile?.getAll() ?? ({ file: {}, filename: '', id: '', userId: '' } as FileDestructured))
  const [data, setData] = useState([] as any[])
  const [url, setUrl] = useState(null as string | null)

  useEffect(() => {
    const file = usedFile?.getAll()
    if (!file) return
    setFile(file)

    if (!file.file.url) return
    setUrl(file.file.url)

    if (!parse) return
    papaParse(file.file.url, {
      complete: (results) => setData(results.data),
      download: true,
      header: parse.header
    })
  }, [file, parse, setData, setFile, usedFile])

  const db = {
    addFile: FileHooks.useAddFile()
  }

  /**
   * Helper to store a file in the database.
   */
  const storeFile = ({ target }: ChangeEvent<HTMLInputElement>, callback?: (file: FileDestructured) => void) => {
    const file = target.files?.[0]
    if (!file) return

    db.addFile({
      file,
      filename: file.name
    }).then((file: File) => {
      const destructured = file.getAll()
      setFile(destructured)
      callback?.(destructured)
    })
  }

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
    id: file.id,
    name: file.filename,
    storeFile,
    url,
    ...(parse?.type === 'csv' && parse.header && data.length > 0 ? { headers: Object.keys(data[0]) } : {})
  }
}
