import { Cable, Image } from 'lucide-react'

import { CreateBoardInputsContent, CreateBoardPreviewContent } from '@/components/pages/create'
import { useCreateBoardContext } from '@/components/providers'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CreateUserBoardContent() {
  const { isInputValid } = useCreateBoardContext()

  // TODO: set page title to board name

  return (
    <Tabs className="w-full" defaultValue="inputs">
      <TabsContent value="inputs" className="flex w-full flex-col items-center gap-5">
        <CreateBoardInputsContent />
      </TabsContent>
      <TabsContent value="preview" className="flex w-full flex-col items-center">
        <CreateBoardPreviewContent />
      </TabsContent>
      <CreateBoardTabsList isInputValid={isInputValid} />
    </Tabs>
  )
}

function CreateBoardTabsList({ isInputValid }: { isInputValid: boolean }) {
  return (
    <TabsList className="fixed bottom-5 right-5 min-w-[220px] items-center">
      <TabsTrigger value="inputs" className="flex gap-2">
        <Cable />
        <span>Inputs</span>
      </TabsTrigger>
      <TabsTrigger value="preview" className="flex gap-2" disabled={!isInputValid}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image />
        <span>Preview</span>
      </TabsTrigger>
    </TabsList>
  )
}
