import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type BoardInput } from '@/types'

type InputFieldProps = {
  input: BoardInput
  value?: string
  onChange?: (value: string) => void
}

export default function InputField({ input, value, onChange }: InputFieldProps) {
  return (
    <>
      {/* Text, Number */}
      {['text', 'number'].includes(input.type) && (
        <Input type={input.type} name={input.name} value={value} onChange={(e) => onChange?.(e.target.value)} />
      )}
      {/* Currency */}
      {['currency'].includes(input.type) && (
        <Input type="number" name={input.name} value={value} onChange={(e) => onChange?.(e.target.value)} />
      )}
      {/* Currency-Select */}
      {['currency-select'].includes(input.type) && (
        <Select defaultValue={value} onValueChange={(value) => onChange?.(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['AUD', 'USD'].map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  )
}
