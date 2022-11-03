import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useId, useState } from 'react'
import Loading from '../components/Loading'
import NavBar from '../components/NavBar'
import { trpc } from '../utils/trpc'

const GroupForm = () => {
  const router = useRouter()

  const createGroup = trpc.useMutation('groups.createGroup', {
    onSuccess(data) {
      router.push(`/g/${data.groupId}`)
    }
  })

  const nameId = useId()
  const [name, setName] = useState('')

  const descriptionId = useId()
  const [description, setDescription] = useState('')

  const locationId = useId()
  const [location, setLocation] = useState('')

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      createGroup.mutate({
        name,
        description,
        location
      })
    },
    [name, description, location]
  )

  return (
    <div className='card m-6 bg-base-200 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>New Group</h2>
        <form className='form-control' onSubmit={handleSubmit}>
          <label className='label' htmlFor={nameId}>
            <span className='label-text'>Name:</span>
          </label>
          <input
            className='input input-bordered'
            type='text'
            id={nameId}
            value={name}
            onChange={e => setName(e.currentTarget.value)}
          />

          <label className='label' htmlFor={descriptionId}>
            <span className='label-text'>Description:</span>
          </label>
          <input
            className='input input-bordered'
            type='text'
            id={descriptionId}
            value={description}
            onChange={e => setDescription(e.currentTarget.value)}
          />

          <label className='label' htmlFor={locationId}>
            <span className='label-text'>Location:</span>
          </label>
          <input
            className='input input-bordered'
            type='text'
            id={locationId}
            value={location}
            onChange={e => setLocation(e.currentTarget.value)}
          />
          <br />

          <div className='card-actions justify-end'>
            <input className='btn btn-primary' type='submit' />
          </div>
        </form>
      </div>
    </div>
  )
}

const MakeGroup: NextPage = () => {
  const session = useSession({ required: true })

  return (
    <>
      <Head>
        <title>Make Group - TouchGrass</title>
        <meta name='description' content='Make a new group' />
      </Head>

      {session.status === 'loading' ? (
        <Loading />
      ) : (
        <main>
          <NavBar session={session.data} />
          <GroupForm />
        </main>
      )}
    </>
  )
}

export default MakeGroup
