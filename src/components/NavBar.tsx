import Image from 'next/image'
import Link from 'next/link'
import type { Session } from 'next-auth'

const NavBar = ({ session }: { session: Session }) => (
  <nav className='navbar bg-base-100'>
    <div className='flex-1'>
      <div className='btn btn-ghost text-xl normal-case'>
        <Link href='/'>OpenMeetUp</Link>
      </div>
    </div>
    <div className='flex-none gap-2'>
      <div className='form-control'>
        <input
          type='text'
          placeholder='Search'
          className='input input-bordered'
        />
      </div>
      <div className='dropdown dropdown-end'>
        <label tabIndex={0} className='avatar btn btn-ghost btn-circle'>
          <div className='relative w-10 rounded-full'>
            {session.user?.image && (
              <Image src={session.user.image} layout='fill' />
            )}
          </div>
        </label>
        <ul
          tabIndex={0}
          className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow'
        >
          <li>
            <Link href='/me'>Profile Settings</Link>
          </li>
          <li>
            <Link href='/make-group'>Make Group</Link>
          </li>
          <li>
            <Link href='/groups'>Groups</Link>
          </li>
          <li>
            <Link href='/chat'>Conversations</Link>
          </li>
          <li>
            <Link href='/api/auth/signout'>Sign Out</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

export default NavBar
