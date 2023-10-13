import { DialogClose } from '@radix-ui/react-dialog'
import { useNavigate } from '@verdant-web/react-router'
import { Save } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { type ReactNode, useState } from 'react'

import { useCreateBoardContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputHooks from '@/stores/inputs'

type CreateBoardConfirmationDialogProps = {
  trigger: ReactNode
  onSave?: () => void
}

export default function CreateBoardConfirmationDialog({ trigger, onSave }: CreateBoardConfirmationDialogProps) {
  const { data: session } = useSession()
  const { board, getInputType, getInputValue } = useCreateBoardContext()
  const [name, setName] = useState(board.name)
  const nav = useNavigate()
  const addInput = InputHooks.useAddInput()

  const onClick = () => {
    onSave?.()

    board.inputs
      .filter((input) => getInputType(input.id) === 'new')
      .map((input) =>
        addInput({
          name,
          type: input.type,
          userId: session?.user.id ?? '',
          value: getInputValue(input.id)
        })
      )

    nav(`/boards/${board.id}`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Board</DialogTitle>
          <DialogDescription>Double check everything looks good. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          {board.inputs.map((input) => {
            const value = getInputValue(input.id)

            return (
              <div key={`create-user-board-inputs-${input.id}`} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={input.id} className="text-right">
                  {input.name}
                </Label>
                <Input id={input.id} defaultValue={value} className="col-span-3" disabled />
              </div>
            )
          })}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="flex gap-2" onClick={onClick}>
              <Save />
              <span>Save</span>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
