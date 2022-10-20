import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Loading from '../../../components/Loading'
import NavBar from '../../../components/NavBar'

const MakeEvent: NextPage = () => {
  const router = useRouter()
  const { groupId } = router.query

  const session = useSession({ required: true })

  if (session.status === 'loading') return <Loading />

  return (
    <main>
      <NavBar session={session.data} />
    </main>
  )
}

export default MakeEvent
