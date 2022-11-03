import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'

const Events: NextPage = () => {
  const session = useSession({ required: true })

  return (
    <>
      <Head>
        <title>Events - TouchGrass</title>
        <meta name='description' content='Events from your groups' />
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

export default Events
