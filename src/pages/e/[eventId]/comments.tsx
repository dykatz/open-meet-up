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

const EventCommentsCard = ({ id }: { id: string }) => {
  return (
    <>
      <Head>
        <title>Comments - ... - TouchGrass</title>
        <meta name='description' content='Comments on the ... event' />
      </Head>

      <div className='card m-6 bg-base-200 shadow-xl'>
        <Link href={`/e/${id}`}>
          <div className='btn'>Back</div>
        </Link>
        <h2 className='card-title'>Comments</h2>
      </div>
    </>
  )
}

const EventComments: NextPage = () => {
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
        <EventCommentsCard id={eventId} />
      )}
    </main>
  )
}

export default EventComments
