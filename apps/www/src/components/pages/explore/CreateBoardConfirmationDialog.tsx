import { DialogClose } from '@radix-ui/react-dialog'
import { Save } from 'lucide-react'
import { type ReactNode, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type CreateBoardConfirmationDialogProps = {
  trigger: ReactNode
  onSave?: (boardName: string) => void
}

export default function CreateBoardConfirmationDialog({ trigger, onSave }: CreateBoardConfirmationDialogProps) {
  const [name, setName] = useState('')

  const onClick = () => {
    onSave?.(name)
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
