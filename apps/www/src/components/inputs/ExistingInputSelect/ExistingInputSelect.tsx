import { type SelectProps } from '@radix-ui/react-select'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type InputDestructured } from '@/stores/inputs/client'
import { type Prettify } from '@/types'

type ExistingInputSelectProps = Prettify<
  {
    options: InputDestructured[]
    className?: string
    onValueChange?: (value: string) => void
  } & SelectProps
>

export default function ExistingInputSelect({ options, className, onValueChange, ...props }: ExistingInputSelectProps) {
  return (
    <div className={className}>
      <Select onValueChange={(value) => onValueChange?.(value)} {...props}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={`existing-input-select-item-${option.id}`} value={option.id}>
              {option.name}: {option.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
