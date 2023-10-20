import { type ChangeEvent } from 'react'

import { type InputFieldProps } from '@/components/pages/create/InputField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type BoardInputColumnDefinition } from '@/types'

import { useFile } from './hooks'

export default function TableInput({ input, value: id, properties, onChange, onPropertyChange }: InputFieldProps) {
  const { data, name, storeFile, headers, getExample } = useFile({ id, parse: { header: true, type: 'csv' } })

  if (input.type !== 'table') return null

  /**
   * Click the hidden file input to open the file selection dialog.
   */
  const onSelectClick = () => (document.querySelector(`input[name="${input.name}"]`) as any)?.click()

  /**
   * Store the file and call the onChange callback.
   */
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    storeFile(event, (file) => onChange?.(file.id, { displayValue: file.filename }))
    // Reset column properties
    input.properties.forEach((column) => column.required && onPropertyChange?.(column.id, '', { isValid: false }))
  }

  /**
   * Update the columns property value by calling the onPropertyChange callback and set the column validity if required.
   */
  const onColumnChange = (column: BoardInputColumnDefinition, value: string) => {
    onPropertyChange?.(column.id, value, { isValid: !column.required || value !== '' })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* File section */}
      <div className="flex gap-2">
        <Button className="min-w-[120px]" variant="outline" onClick={onSelectClick}>
          Select File
        </Button>
        <Input type="text" value={name} readOnly />
      </div>
      {/* Hidden file input to handle file selection */}
      <Input type="file" accept=".csv" multiple={false} name={input.name} onChange={onFileChange} className="hidden" />
      {/* Column selection */}
      {data.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Column Selection</h2>
          <p className="mb-4 text-sm text-muted-foreground">Select the columns that best apply.</p>
          {input.properties.map((column) => (
            <div key={`table-input-column-${column.id}`} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex min-w-[120px] flex-none items-center rounded px-3 text-left">
                  <Label>{column.name}</Label>
                </div>
                <div className="flex-1">
                  <Select defaultValue={properties?.[column.id]} onValueChange={(value) => onColumnChange(column, value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {headers?.map((header: string) => {
                          const example = getExample(header)

                          return (
                            <SelectItem key={`table-input-column-select-${header}`} value={header}>
                              <span>{header}</span>
                              <span>{example !== '' ? ` (${example})` : ''}</span>
                            </SelectItem>
                          )
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
