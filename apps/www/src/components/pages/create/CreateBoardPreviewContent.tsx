import { Save } from 'lucide-react'
import { useState } from 'react'

import { Icons } from '@/components/icons'
import { CreateBoardConfirmationDialog } from '@/components/pages/create'
import { useCreateBoardContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function CreateBoardPreviewContent() {
  const { isInputValid } = useCreateBoardContext()
  const [isSaving, setIsSaving] = useState(false)
  const onSave = () => {
    setIsSaving(true)
  }

  return (
    <>
      <Card className="w-full pt-5">
        <CardContent>
          <p>Preview Content ...</p>
        </CardContent>
      </Card>
      {/* Save button dialog */}
      <CreateBoardConfirmationDialog
        trigger={
          <Button className="fixed bottom-20 right-5 flex min-w-[220px] gap-2" disabled={!isInputValid || isSaving}>
            {isSaving ? (
              <Icons.spinner className="animate-spin" />
            ) : (
              <>
                <Save />
                <span>Save</span>
              </>
            )}
          </Button>
        }
        onSave={onSave}
      />
    </>
  )
}
