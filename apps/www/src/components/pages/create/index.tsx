import { useParams } from '@verdant-web/react-router'

import CreateBoardConfirmationDialog from '@/components/pages/create/CreateBoardConfirmationDialog'
import CreateBoardContent from '@/components/pages/create/CreateBoardContent'
import CreateBoardInputsContent from '@/components/pages/create/CreateBoardInputsContent'
import CreateBoardPreviewContent from '@/components/pages/create/CreateBoardPreviewContent'
import ExistingInputSelect from '@/components/pages/create/ExistingInputSelect'
import InputField from '@/components/pages/create/InputField'
import CreateBoardProvider from '@/components/providers/CreateBoardProvider'
import { api } from '@/utils/api'

export {
  CreateBoardConfirmationDialog,
  CreateBoardContent,
  CreateBoardInputsContent,
  CreateBoardPreviewContent,
  ExistingInputSelect,
  InputField
}

export default function Create() {
  const params = useParams()

  const { data: board } = api.boards.getBoard.useQuery({ id: params.id! })

  return (
    <>
      {board && (
        <CreateBoardProvider board={{ id: params.id!, ...board }}>
          <CreateBoardContent />
        </CreateBoardProvider>
      )}
    </>
  )
}
