import type { NextPage } from 'next'
import Error from 'next/error'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Loading from '../../../components/Loading'
import NavBar from '../../../components/NavBar'
import { trpc } from '../../../utils/trpc'

const NoGroup = () => <Error statusCode={404} title='No Group Found' />

const GroupMembership = ({
  userId,
  image,
  name
}: {
  userId: string
  image?: string
  name: string
}) => (
  <div className='avatar btn btn-ghost btn-circle'>
    <div className='relative w-10 rounded-full'>
      {image && (
        <Link href={`/u/${userId}`}>
          <Image src={image} alt={name} layout='fill' />
        </Link>
      )}
    </div>
  </div>
)

const GroupEvent = ({
  eventId,
  name,
  location
}: {
  eventId: string
  name: string
  location: string
}) => (
  <div className='card m-6 bg-base-300 shadow-xl'>
    <div className='card-body'>
      <Link href={`/e/${eventId}`}>
        <h2 className='card-title'>{name}</h2>
      </Link>
      <p>{location}</p>
    </div>
  </div>
)

const GroupComment = ({
  name,
  content,
  date
}: {
  name: string
  content: string
  date: Date
}) => (
  <div className='card m-6 bg-base-300 shadow-xl'>
    <div className='card-body'>
      <h2 className='card-title'>{name}</h2>
      <p>{date.toString()}</p>
      <p>{content}</p>
    </div>
  </div>
)

const GroupCard = ({ id }: { id: string }) => {
  const group = trpc.useQuery(['groups.getGroup', id])

  if (group.error !== null) return <NoGroup />
  if (group.data === undefined) return <Loading />

  return (
    <div className='card m-6 bg-base-200 shadow-xl'>
      {group.data.banner && (
        <figure>
          <Image src={group.data.banner} layout='fill' />
        </figure>
      )}
      <div className='card-body'>
        <h2 className='card-title'>{group.data.name}</h2>
        <p>{group.data.description}</p>
        <div className='flex space-x-4'>
          {group.data.memberships.map(membership => (
            <GroupMembership
              key={membership.userId}
              userId={membership.userId}
              image={membership.user.image || undefined}
              name={membership.user.name || ''}
            />
          ))}
          <Link href={`/g/${id}/members`}>
            <div className='btn btn-outline btn-circle'>+</div>
          </Link>
        </div>
        <p>
          {group.data.location} | {group.data.membershipCount} Members
        </p>
        {group.data.events.length > 0 && (
          <>
            <div className='divider'>Events</div>
            {group.data.events.map(event => (
              <GroupEvent
                key={event.id}
                eventId={event.id}
                name={event.name}
                location={event.location}
              />
            ))}
            <Link href={`/g/${id}/events`}>
              <div className='btn btn-outline btn-circle'>+</div>
            </Link>
          </>
        )}
        {group.data.comments.length > 0 && (
          <>
            <div className='divider'>Comments</div>
            {group.data.comments.map(comment => (
              <GroupComment
                key={comment.id}
                name={comment.user.name || ''}
                date={comment.date}
                content={comment.content}
              />
            ))}
            <Link href={`/g/${id}/comments`}>
              <div className='btn btn-outline btn-circle'>+</div>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

const GroupFromRouter = () => {
  const router = useRouter()
  const { groupId } = router.query

  if (groupId === undefined) return <NoGroup />
  if (Array.isArray(groupId)) return <NoGroup />

  return <GroupCard id={groupId} />
}

const Group: NextPage = () => {
  const session = useSession({ required: true })

  if (session.status === 'loading') return <Loading />

  return (
    <main>
      <NavBar session={session.data} />
      <GroupFromRouter />
    </main>
  )
}

export default Group
