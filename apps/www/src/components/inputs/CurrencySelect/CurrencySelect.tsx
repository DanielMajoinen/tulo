import { type InputFieldProps } from '@/components/pages/create/InputField'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const currencies: Record<string, { symbol: string; name: string; code: string }> = {
  aud: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: '$'
  },
  usd: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$'
  }
}

export default function CurrencySelect({ value, onChange }: InputFieldProps) {
  const displayValue = (key: string) => {
    const { name, code } = currencies[key] ?? {}
    return `${code} - ${name}`
  }

  const onValueChange = (value: string) => {
    onChange?.(value, { displayValue: displayValue(value) })
  }

  return (
    <Select defaultValue={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(currencies)
          .sort()
          .map((key) => {
            return (
              <SelectItem key={`currency-select-${key}`} value={key}>
                {displayValue(key)}
              </SelectItem>
            )
          })}
      </SelectContent>
    </Select>
  )
}
