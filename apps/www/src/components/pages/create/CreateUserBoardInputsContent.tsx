import * as React from 'react'

import { useAllUserInputsByType } from '@/components/pages/create/hooks'
import { ExistingInputField, InputField } from '@/components/pages/create/index'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type Board } from '@/types'

type CreateUserBoardInputsContentProps = {
  board: Board
  values?: Record<string, string>
  onValueChange?: (id: string, value: string) => void
}

const CreateUserBoardInputsContent: React.FC<CreateUserBoardInputsContentProps> = ({
  board,
  values,
  onValueChange
}: CreateUserBoardInputsContentProps) => {
  const userInputs = useAllUserInputsByType()

  return (
    <>
      {board.inputs.map((input) => {
        const hasExistingInputs = (userInputs[input.id]?.length ?? 0) > 0

        return (
          <Card className="w-full" key={`create-board-inputs-${input.id}`}>
            <CardHeader>
              <CardTitle>{input.name}</CardTitle>
              <CardDescription>{input.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs className="w-full" defaultValue="new">
                <TabsList>
                  <TabsTrigger value="new" className="flex gap-2">
                    <span>New</span>
                  </TabsTrigger>
                  <TabsTrigger value="existing" className="flex gap-2" disabled={!hasExistingInputs}>
                    <span>Existing</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="new">
                  <InputField input={input} value={values?.[input.id]} onChange={(value) => onValueChange?.(input.id, value)} />
                </TabsContent>
                <TabsContent value="existing">
                  <ExistingInputField inputs={userInputs[input.type] ?? []} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}

export default CreateUserBoardInputsContent
