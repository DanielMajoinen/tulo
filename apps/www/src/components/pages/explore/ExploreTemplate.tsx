import { useNavigate, useParams } from '@verdant-web/react-router'
import { Cable, Image, Save } from 'lucide-react'
import { useState } from 'react'

import { Templates } from '@/boards'
import { Icons } from '@/components/Icons'
import { InputField } from '@/components/inputs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DraftBoardProvider, useDraftBoardContext } from '@/context'

import CreateBoardConfirmationDialog from './CreateBoardConfirmationDialog'

export default function ExploreTemplate() {
  const params = useParams()
  const router = useNavigate()
  if (!params.id) {
    router('/explore')
  }

  const board = Templates.get.board({ id: params.id! })
  return board ? (
    <DraftBoardProvider board={board}>
      <Component />
    </DraftBoardProvider>
  ) : null
}

function Component() {
  return (
    <Tabs className="w-full" defaultValue="inputs">
      <Inputs />
      <Preview />
      <TabSelection />
    </Tabs>
  )
}

function Inputs() {
  const { inputs, setInputPropertyValue, setInputValue } = useDraftBoardContext((state) => state)

  return (
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
  )
}

function Preview() {
  const { saveBoard, setName } = useDraftBoardContext((state) => ({ saveBoard: state.saveBoard, setName: state.setName }))
  const [isSaving, setIsSaving] = useState(false)
  const navigate = useNavigate()

  const onSave = (name: string) => {
    setIsSaving(true)
    setName(name)

    const id = saveBoard?.()
    id && navigate(`/board/${id}`)
  }

  return (
    <TabsContent value="preview" className="flex w-full flex-col items-center gap-5">
      <Card className="w-full pt-5">
        <CardContent>
          <p>Preview Content ...</p>
        </CardContent>
      </Card>
      {/* Save button dialog */}
      <CreateBoardConfirmationDialog
        onSave={onSave}
        trigger={
          <Button className="fixed bottom-20 right-5 flex min-w-[220px] gap-2" disabled={saveBoard === null || isSaving}>
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
      />
    </TabsContent>
  )
}

function TabSelection() {
  const saveBoard = useDraftBoardContext((state) => state.saveBoard)

  return (
    <TabsList className="fixed bottom-5 right-5 min-w-[220px] items-center">
      <TabsTrigger value="inputs" className="flex gap-2">
        <Cable />
        <span>Inputs</span>
      </TabsTrigger>
      <TabsTrigger value="preview" className="flex gap-2" disabled={saveBoard === null}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image />
        <span>Preview</span>
      </TabsTrigger>
    </TabsList>
  )
}