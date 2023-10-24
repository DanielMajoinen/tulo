import { type BoardInputDefinition, type BoardInputProperty } from '@/boards'
import { CurrencySelect, TableInput } from '@/components/inputs'
import { Input } from '@/components/ui/input'
import { type Prettify } from '@/types'

export type InputFieldProps = Prettify<{
  name: string
  type: BoardInputDefinition['type']
  properties?: Prettify<Record<string, Prettify<Omit<BoardInputProperty, 'id' | 'type'> & { value?: string }>>>
  value?: string
  onChange?: (
    value: string,
    options?: {
      displayValue?: string
    }
  ) => void
  onPropertyChange?: (property: string, value: string) => void
}>

export default function InputField(props: InputFieldProps) {
  return (
    <>
      {/* Text, Number */}
      {['text', 'number'].includes(props.type) && (
        <Input type={props.type} name={props.name} value={props.value} onChange={(e) => props.onChange?.(e.target.value)} />
      )}
      {/* Currency */}
      {['currency'].includes(props.type) && (
        <Input type="number" name={props.name} value={props.value} onChange={(e) => props.onChange?.(e.target.value)} />
      )}
      {props.type === 'currency-select' && <CurrencySelect {...props} />}
      {props.type === 'table' && <TableInput {...props} />}
    </>
  )
}
