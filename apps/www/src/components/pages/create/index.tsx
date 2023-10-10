import { useParams } from '@verdant-web/react-router'
import { useRouter } from 'next/router'

import CreateLayout from '@/components/layouts/create/CreateLayout'
import CreateUserBoardContent from '@/components/pages/create/CreateUserBoardContent'
import CreateUserBoardInputsContent from '@/components/pages/create/CreateUserBoardInputsContent'
import CreateUserBoardPreviewContent from '@/components/pages/create/CreateUserBoardPreviewContent'
import ExistingInputField from '@/components/pages/create/ExistingInputField'
import InputField from '@/components/pages/create/InputField'
import { api } from '@/utils/api'

export { CreateUserBoardContent, CreateUserBoardInputsContent, CreateUserBoardPreviewContent, ExistingInputField, InputField }

export default function Create() {
  const params = useParams()
  const router = useRouter()

  if (!params.id) {
    router.back()
  }

  const board = api.boards.getBoard.useQuery({ id: params.id! })

  return (
    <CreateLayout>
      {board.isLoading && <p>Loading ...</p>}
      {board.data && <CreateUserBoardContent board={board.data} />}
    </CreateLayout>
  )
}
