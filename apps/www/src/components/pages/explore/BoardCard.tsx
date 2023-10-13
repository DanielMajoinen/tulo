import { useNavigate } from '@verdant-web/react-router'
import { BadgeCheck } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type Board } from '@/types'

type BoardCardProps = Board

export default function BoardCard(props: BoardCardProps) {
  const { id, name, owner, description, tags } = props
  const navigate = useNavigate()
  const isTuloOwned = owner === 'Tulo'

  return (
    <Card className="flex max-h-[50%] w-full flex-col md:w-auto md:max-w-[calc(50%-10px)] lg:max-w-[calc(33%-10px)]">
      <CardHeader className="flex-none pb-3">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-0">
        {/* Tags */}
        <div className="mb-3 flex flex-none gap-3">
          {isTuloOwned && <TuloBadge />}
          {tags?.map((tag) => <Badge key={`tag-${tag}`}>{tag}</Badge>)}
        </div>
        <div className="flex flex-1 flex-col">
          {/* Description */}
          <p className="flex-1 text-xs text-muted-foreground">{description}</p>
          {/* Actions */}
          <div className="mt-5 flex flex-none flex-col gap-3">
            <Button className="w-full" onClick={() => navigate(`/explore/${id}`)}>
              Create
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TuloBadge() {
  return (
    <Badge>
      <div className="flex items-center text-sm">
        <div>Tulo</div>
        <div>
          <BadgeCheck className="h-4" />
        </div>
      </div>
    </Badge>
  )
}
