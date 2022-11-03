import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Error from 'next/error'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LoadingUser from '../../../components/LoadingUser'
import NavBar from '../../../components/NavBar'
import { trpc } from '../../../utils/trpc'

const NoUser = () => <Error statusCode={404} title='No User Found' />

const UserChatCard = ({ id }: { id: string }) => {
  return (
    <>
      <Head>
        <title>Chat - ... - TouchGrass</title>
        <meta name='description' content='...' />
      </Head>

      <div className='card m-6 bg-base-200 shadow-xl'>
        <div className='card-body'>
          <div className='grid grid-cols-2 space-x-6'>
            <Link href={`/u/${id}`}>
              <div className='btn'>Profile</div>
            </Link>
            <Link href='/chat'>
              <div className='btn'>Chats</div>
            </Link>
          </div>
          <h2 className='card-title'>Messages</h2>
        </div>
      </div>
    </>
  )
}

const UserChat: NextPage = () => {
  const router = useRouter()
  const session = useSession({ required: true })

  const { userId } = router.query

  if (session.status === 'loading') return <LoadingUser />

  return (
    <main>
      <NavBar session={session.data} />

      {userId === undefined || Array.isArray(userId) ? (
        <NoUser />
      ) : (
        <UserChatCard id={userId} />
      )}
    </main>
  )
}

export default UserChat
