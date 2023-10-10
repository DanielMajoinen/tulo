import { Save } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function CreateUserBoardPreviewContent() {
  return (
    <>
      <Card className="w-full pt-5">
        <CardContent>
          <p>Preview Content ...</p>
        </CardContent>
      </Card>
      {/* Save button */}
      <Button className="absolute bottom-20 right-5 flex min-w-[220px] gap-2">
        <Save />
        <span>Save</span>
      </Button>
    </>
  )
}
