import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Error from 'next/error'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LoadingGroup from '../../../components/LoadingGroup'
import NavBar from '../../../components/NavBar'
import { trpc } from '../../../utils/trpc'

const NoGroup = () => <Error statusCode={404} title='No Group Found' />

const GroupCommentsCard = ({ id }: { id: string }) => {
  return (
    <>
      <Head>
        <title>Comments - ... - TouchGrass</title>
        <meta name='description' content='Comments on the ... group' />
      </Head>

      <div className='card m-6 bg-base-200 shadow-xl'>
        <div className='card-body'>
          <Link href={`/g/${id}`}>
            <div className='btn'>Back</div>
          </Link>
          <h2 className='card-title'>Comments</h2>
        </div>
      </div>
    </>
  )
}

const GroupComments: NextPage = () => {
  const router = useRouter()
  const session = useSession({ required: true })

  const { groupId } = router.query

  if (session.status === 'loading') return <LoadingGroup />

  return (
    <main>
      <NavBar session={session.data} />

      {groupId === undefined || Array.isArray(groupId) ? (
        <NoGroup />
      ) : (
        <GroupCommentsCard id={groupId} />
      )}
    </main>
  )
}

export default GroupComments
