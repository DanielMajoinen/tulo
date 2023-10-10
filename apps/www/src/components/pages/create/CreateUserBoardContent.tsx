import { Cable, Image } from 'lucide-react'
import * as React from 'react'

import { CreateUserBoardInputsContent, CreateUserBoardPreviewContent } from '@/components/pages/create/index'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type Board } from '@/types'

type CreateUserBoardContentProps = {
  board: Board
}

const CreateUserBoardContent: React.FC<CreateUserBoardContentProps> = ({ board }: CreateUserBoardContentProps) => {
  const [inputValues, setInputValues] = React.useState<Record<string, string>>(
    board.inputs.reduce((acc, input) => ({ ...acc, [input.id]: '' }), {})
  )

  return (
    <Tabs className="w-full" defaultValue="inputs">
      <h1 className="mb-5 text-4xl">{board.name}</h1>
      <TabsContent value="inputs" className="flex w-full flex-col items-center gap-5">
        <CreateUserBoardInputsContent
          board={board}
          values={inputValues}
          onValueChange={(id, value) => setInputValues({ ...inputValues, [id]: value })}
        />
      </TabsContent>
      <TabsContent value="preview" className="flex w-full flex-col items-center">
        <CreateUserBoardPreviewContent />
      </TabsContent>
      <CreateUserBoardTabsList />
    </Tabs>
  )
}

const CreateUserBoardTabsList: React.FC = () => (
  <TabsList className="absolute bottom-5 right-5 min-w-[220px] items-center">
    <TabsTrigger value="inputs" className="flex gap-2">
      <Cable />
      <span>Inputs</span>
    </TabsTrigger>
    <TabsTrigger value="preview" className="flex gap-2">
      <Image />
      <span>Preview</span>
    </TabsTrigger>
  </TabsList>
)

export default CreateUserBoardContent
