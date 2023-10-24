import { useMatch, useParams } from '@verdant-web/react-router'
import { useRouter } from 'next/router'

export default function Board() {
  const params = useParams()
  const router = useRouter()

  if (useMatch({ end: true, path: '/board' })) {
    router.back()
  }

  return <p>{params.id!}</p>
}
