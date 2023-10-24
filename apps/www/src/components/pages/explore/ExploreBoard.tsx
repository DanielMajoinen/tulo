import { useNavigate, useParams } from '@verdant-web/react-router'
import { Cable, Image } from 'lucide-react'

import { type BoardId, useBoard } from '@/boards'
import { InputField } from '@/components/pages/create'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DraftBoardProvider, useDraftBoardContext } from '@/context'

export default function ExploreBoard() {
  const params = useParams()
  const router = useNavigate()
  if (!params.id) {
    router('/explore')
  }

  const board = useBoard(params.id as BoardId)
  return board ? (
    <DraftBoardProvider board={board}>
      <ExploreBoardTabs />
    </DraftBoardProvider>
  ) : null
}

function ExploreBoardTabs() {
  const { inputs, saveBoard, setInputPropertyValue, setInputValue } = useDraftBoardContext((state) => state)

  return (
    <Tabs className="w-full" defaultValue="inputs">
      <TabsContent value="inputs" className="flex w-full flex-col items-center gap-5">
        {Object.entries(inputs).map(([id, input]) => {
          return (
            <Card className="w-full" key={`create-board-inputs-${id}`}>
              <CardHeader>
                <CardTitle>{input.name}</CardTitle>
                <CardDescription>{input.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs className="w-full" defaultValue="new">
                  <TabsList className="hidden">
                    <TabsTrigger value="new" className="flex gap-2" onClick={() => {}}>
                      <span>New</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="new">
                    <InputField
                      name={input.name}
                      type={input.type}
                      value={input.value}
                      properties={input.properties}
                      onChange={(value, _options) => setInputValue(id, value)}
                      onPropertyChange={(property, value) => setInputPropertyValue(id, property, value)}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )
        })}
      </TabsContent>
      <TabsContent value="preview" className="flex w-full flex-col items-center gap-5">
        <p>Preview content ...</p>
      </TabsContent>
      <CreateBoardTabsList isInputValid={saveBoard !== null} />
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
