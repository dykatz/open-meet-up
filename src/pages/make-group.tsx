import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
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

      <input className='btn btn-primary' type='submit' />
    </form>
  )
}

const MakeGroup: NextPage = () => {
  const session = useSession({ required: true })

  if (session.status === 'loading') return <Loading />

  return (
    <main>
      <NavBar session={session.data} />
      <h1>New Group</h1>
      <hr />
      <GroupForm />
    </main>
  )
}

export default MakeGroup
