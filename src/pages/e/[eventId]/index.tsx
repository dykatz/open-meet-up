import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Error from 'next/error'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LoadingEvent from '../../../components/LoadingEvent'
import NavBar from '../../../components/NavBar'
import { trpc } from '../../../utils/trpc'

const NoEvent = () => <Error statusCode={404} title='No Event Found' />

const EventCard = ({ id }: { id: string }) => {
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

const Event: NextPage = () => {
  const router = useRouter()
  const session = useSession({ required: true })

  const { eventId } = router.query

  if (session.status === 'loading') return <LoadingEvent />

  return (
    <main>
      <NavBar session={session.data} />

      {eventId === undefined || Array.isArray(eventId) ? (
        <NoEvent />
      ) : (
        <EventCard id={eventId} />
      )}
    </main>
  )
}

export default Event
