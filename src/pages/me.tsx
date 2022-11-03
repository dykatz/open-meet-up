import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'

const Me: NextPage = () => {
  const session = useSession({ required: true })

  return (
    <>
      <Head>
        <title>My Profile - TouchGrass</title>
        <meta name='description' content='Modify your profile settings' />
        <link rel='icon' href='/favicon.ico' />
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

export default Me
