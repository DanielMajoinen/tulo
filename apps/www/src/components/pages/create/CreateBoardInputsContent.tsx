import { ExistingInputSelect, InputField } from '@/components/pages/create'
import { useAllUserInputsByType } from '@/components/pages/create/hooks'
import { useCreateBoardContext } from '@/components/providers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CreateBoardInputsContent() {
  const { board, inputType, inputValue, inputProperties } = useCreateBoardContext()
  const { getUserInputsByType } = useAllUserInputsByType()

  return (
    <>
      {board.inputs.map((input) => {
        const userInputs = getUserInputsByType(input.type)
        const hasExistingInputs = userInputs.length > 0
        const type = inputType.get(input.id)

        return (
          <Card className="w-full" key={`create-board-inputs-${input.id}`}>
            <CardHeader>
              <CardTitle>{input.name}</CardTitle>
              <CardDescription>{input.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs className="w-full" defaultValue={type}>
                <TabsList className={!hasExistingInputs ? 'hidden' : ''}>
                  <TabsTrigger
                    value="existing"
                    className="flex gap-2"
                    onClick={() => inputType.set(input.id, 'existing')}
                    disabled={!hasExistingInputs}
                  >
                    <span>Existing</span>
                  </TabsTrigger>
                  <TabsTrigger value="new" className="flex gap-2" onClick={() => inputType.set(input.id, 'new')}>
                    <span>New</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="new">
                  <InputField
                    input={input}
                    value={inputValue.get(input.id, 'new')}
                    properties={inputProperties.get(input.id, 'new')}
                    onChange={(value, options) => inputValue.set(input.id, value, options)}
                    onPropertyChange={(property, value, options) => inputProperties.set(input.id, property, value, options)}
                  />
                </TabsContent>
                <TabsContent value="existing">
                  <ExistingInputSelect
                    defaultValue={inputValue.get(input.id, 'existing')}
                    options={userInputs}
                    onValueChange={(value) => inputValue.set(input.id, value)}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}
