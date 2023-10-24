import { type ChangeEvent } from 'react'

import { type InputFieldProps } from '@/components/inputs/InputField/InputField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFile } from '@/hooks'

type TableInputProps = Omit<InputFieldProps, 'type'>

export default function TableInput({ value: id, name: inputName, properties, onChange, onPropertyChange }: TableInputProps) {
  const { data, name, storeFile, headers, getExample } = useFile({ id, parse: { header: true, type: 'csv' } })

  /**
   * Click the hidden file input to open the file selection dialog.
   */
  const onSelectClick = () => (document.querySelector(`input[name="${inputName}"]`) as any)?.click()

  /**
   * Store the file and call the onChange callback.
   */
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    storeFile(event, (file) => onChange?.(file.id, { displayValue: file.filename }))
    // Reset properties
    Object.keys(properties ?? {}).forEach((id) => onPropertyChange?.(id, ''))
  }

  return (
    <div className="flex flex-col gap-5">
      {/* File section proxy */}
      <div className="flex gap-2">
        <Button className="min-w-[120px]" variant="outline" onClick={onSelectClick}>
          Select File
        </Button>
        <Input type="text" value={name} readOnly />
      </div>
      {/* Hidden file input to handle file selection */}
      <Input type="file" accept=".csv" multiple={false} name={inputName} onChange={onFileChange} className="hidden" />
      {/* Column selection */}
      {data.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Column Selection</h2>
          <p className="mb-4 text-sm text-muted-foreground">Select the columns that best apply.</p>
          {Object.entries(properties ?? {}).map(([id, column]) => (
            <div key={`table-input-column-${id}`} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex min-w-[120px] flex-none items-center rounded px-3 text-left">
                  <Label>{column.name}</Label>
                </div>
                <div className="flex-1">
                  <Select defaultValue={properties?.[id]?.value} onValueChange={(value) => onPropertyChange?.(id, value)}>
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
