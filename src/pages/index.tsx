import type { NextPage } from 'next'
import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'

const UnauthorizedHome = () => (
  <main className='hero min-h-screen bg-base-200'>
    <div className='hero-content text-center'>
      <div className='max-w-md'>
        <h1 className='text-5xl font-bold'>Welcome to OpenMeetUp!</h1>
        <p className='py-6'>
          OpenMeetUp is a one-stop portal for organizing groups and scheduling
          events.
        </p>
        <Link className='btn btn-primary' href='/api/auth/signin'>
          Sign In
        </Link>
      </div>
    </div>
  </main>
)

type RealHomeProps = {
  session: Session
}

const RealHome: React.FC<RealHomeProps> = ({ session }) => {
  return (
    <main>
      <NavBar session={session} />
    </main>
  )
}

const Home: NextPage = () => {
  const session = useSession()

  return (
    <>
      <Head>
        <title>TouchGrass</title>
        <meta
          name='description'
          content='A one-stop portal for organizing groups and scheduling events'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {session.status === 'loading' ? (
        <Loading />
      ) : session.status === 'authenticated' ? (
        <RealHome session={session.data} />
      ) : (
        <UnauthorizedHome />
      )}
    </>
  )
}

export default Home
