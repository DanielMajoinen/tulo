import { ExistingInputSelect, InputField } from '@/components/pages/create'
import { useAllUserInputsByType } from '@/components/pages/create/hooks'
import { useCreateBoardContext } from '@/components/providers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CreateBoardInputsContent() {
  const { board, changeInputType, changeInputValue, getInputType, getInputValue } = useCreateBoardContext()
  const { getUserInputsByType } = useAllUserInputsByType()

  return (
    <>
      {board.inputs.map((input) => {
        const userInputs = getUserInputsByType(input.type)
        const hasExistingInputs = userInputs.length > 0
        const type = getInputType(input.id)
        const value = getInputValue(input.id)

        return (
          <Card className="w-full" key={`create-board-inputs-${input.id}`}>
            <CardHeader>
              <CardTitle>{input.name}</CardTitle>
              <CardDescription>{input.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs className="w-full" defaultValue="new">
                <TabsList>
                  <TabsTrigger value="new" className="flex gap-2" onClick={() => changeInputType(input.id, 'new')}>
                    <span>New</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="existing"
                    className="flex gap-2"
                    onClick={() => changeInputType(input.id, 'existing')}
                    disabled={!hasExistingInputs}
                  >
                    <span>Existing</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="new">
                  {type === 'new' && <InputField input={input} value={value} onChange={(value) => changeInputValue(input.id, value)} />}
                </TabsContent>
                <TabsContent value="existing">
                  {type === 'existing' && (
                    <ExistingInputSelect
                      defaultValue={value}
                      options={userInputs}
                      onValueChange={(value) => changeInputValue(input.id, value)}
                    />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}
