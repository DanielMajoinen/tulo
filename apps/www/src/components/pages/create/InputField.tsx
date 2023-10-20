import { CurrencySelect, TableInput } from '@/components/inputs'
import { Input } from '@/components/ui/input'
import { type BoardInputDefinition } from '@/types'

export type InputFieldProps = {
  input: BoardInputDefinition
  value?: string
  properties?: Record<string, string>
  onChange?: (
    value: string,
    options?: {
      isValid?: boolean
      displayValue?: string
    }
  ) => void
  onPropertyChange?: (
    property: string,
    value: string,
    options?: {
      isValid?: boolean
    }
  ) => void
}

export default function InputField(props: InputFieldProps) {
  const { input, value, onChange } = props

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
      {input.type === 'currency-select' && <CurrencySelect {...props} />}
      {input.type === 'table' && <TableInput {...props} />}
    </>
  )
}
