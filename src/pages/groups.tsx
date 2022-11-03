import { MembershipRole } from '@prisma/client'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'
import { trpc, inferQueryOutput } from '../utils/trpc'

type GroupsWithRole = inferQueryOutput<'groups.listGroups'>
type GroupWithRole = GroupsWithRole[0]

const Group = ({ group, refetch }: { group: GroupWithRole; refetch: any }) => {
  const deleteGroup = trpc.useMutation('groups.deleteGroup', {
    onSuccess() {
      refetch()
    }
  })

  const handleDelete = useCallback(() => {
    deleteGroup.mutate({ groupId: group.id })
  }, [deleteGroup])

  return (
    <div className='card bg-base-200 shadow-xl'>
      {group.banner && (
        <figure>
          <Image src={group.banner} alt={group.description} />
        </figure>
      )}
      <div className='card-body'>
        <h2 className='card-title'>
          <Link href={`/g/${group.id}`}>{group.name}</Link>
        </h2>
        <p>{group.location}</p>
        <p>{group.description}</p>
        <div className='card-actions justify-end'>
          {group.role === MembershipRole.Admin && (
            <button className='btn btn-error' onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const NoGroups = () => (
  <div className='hero' style={{ minHeight: '80vh' }}>
    <div className='hero-content text-center'>
      <div className='max-w-md'>
        <h1 className='text-5xl font-bold'>No Groups Found</h1>
        <p className='py-6'>
          You are not a member of any groups. Find or make one!
        </p>
        <div className='flex justify-center space-x-6'>
          <button className='btn'>Find Group</button>
          <Link href='/make-group'>
            <button className='btn'>Make Group</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

const GroupList = () => {
  const groupList = trpc.useQuery(['groups.listGroups'])
  if (groupList.data === undefined) return <Loading />
  if (groupList.data.length === 0) return <NoGroups />

  return (
    <div className='m-6 flex flex-col space-y-6'>
      {groupList.data.map(group => (
        <Group key={group.id} group={group} refetch={groupList.refetch} />
      ))}
    </div>
  )
}

const Groups: NextPage = () => {
  const session = useSession({ required: true })

  return (
    <>
      <Head>
        <title>Groups - TouchGrass</title>
        <meta name='description' content='Groups that you are a member of' />
      </Head>

      {session.status === 'loading' ? (
        <Loading />
      ) : (
        <main>
          <NavBar session={session.data} />
          <GroupList />
        </main>
      )}
    </>
  )
}

export default Groups
