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

const UserCard = ({ id }: { id: string }) => {
  return (
    <>
      <Head>
        <title>... - TouchGrass</title>
        <meta name='description' content='...' />
      </Head>

      <div className='card m-6 bg-base-200 shadow-xl'></div>
    </>
  )
}

const User: NextPage = () => {
  const router = useRouter()
  const session = useSession({ required: true })

  const { userId } = router.query

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {session.status === 'loading' ? (
        <LoadingUser />
      ) : (
        <main>
          <NavBar session={session.data} />

          {userId === undefined || Array.isArray(userId) ? (
            <NoUser />
          ) : (
            <UserCard id={userId} />
          )}
        </main>
      )}
    </>
  )
}

export default User
