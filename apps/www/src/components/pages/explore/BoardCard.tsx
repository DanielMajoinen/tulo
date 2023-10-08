import { BadgeCheck } from 'lucide-react'
import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type Board } from '@/types'

type BoardCardProps = Board

const BoardCard: React.FC<BoardCardProps> = ({ name, owner, description, tags }: BoardCardProps) => {
  const isTuloOwned = owner === 'Tulo'

  return (
    <Card className="min-w-[220px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Tags */}
        <div className="mb-2 flex gap-3">
          {isTuloOwned && <TuloBadge />}
          {tags?.map((tag) => <Badge key={`tag-${tag}`}>{tag}</Badge>)}
        </div>
        {/* Description */}
        <p className="text-xs text-muted-foreground">{description}</p>
        {/* Actions */}
        <Button className="mt-5 w-full" variant="secondary">
          Preview
        </Button>
        <Button className="mt-5 w-full">Create</Button>
      </CardContent>
    </Card>
  )
}

const TuloBadge: React.FC = () => (
  <Badge>
    <div className="flex items-center text-sm">
      <div>Tulo</div>
      <div>
        <BadgeCheck className="h-4" />
      </div>
    </div>
  </Badge>
)

export default BoardCard
