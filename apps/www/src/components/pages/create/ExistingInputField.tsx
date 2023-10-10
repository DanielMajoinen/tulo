import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type InputDestructured } from '@/stores/inputs/client'

type ExistingInputFieldProps = {
  inputs: InputDestructured[]
}

export default function ExistingInputField({ inputs }: ExistingInputFieldProps) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {inputs.map((input) => (
          <SelectItem key={input.id} value={input.id}>
            {input.name}: {input.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
