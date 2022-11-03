import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'

const Chat: NextPage = () => {
  const session = useSession({ required: true })

  return (
    <>
      <Head>
        <title>Chat - TouchGrass</title>
        <meta name='description' content='Chat with other members' />
      </Head>

      {session.status === 'loading' ? (
        <Loading />
      ) : (
        <main>
          <NavBar session={session.data} />
        </main>
      )}
    </>
  )
}

export default Chat
