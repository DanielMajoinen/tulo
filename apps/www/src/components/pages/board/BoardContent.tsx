import { useRouter } from 'next/router'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBoardContext } from '@/context'

export default function BoardContent() {
  const { board } = useBoardContext((state) => ({ board: state.board }))

  return board ? (
    <div>
      <BalanceCard currency={'AUD'} balance={30000} delta={{ amount: -40, period: 'year' }} />
    </div>
  ) : null
}

const BalanceCard = (props: { currency?: string; balance: number; delta?: { amount: number; period: 'year' | 'month' | 'week' } }) => {
  const { locale } = useRouter()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Balance</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat(locale, { currency: props.currency ?? 'USD', style: 'currency' }).format(props.balance)}
        </div>
        {props?.delta !== undefined && (
          <p className="text-xs text-muted-foreground">
            {props.delta.amount > 0 ? '+' : ''}
            {props.delta.amount}% from last {props.delta.period}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
