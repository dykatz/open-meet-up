import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";

const NavBar = ({ session }: { session: Session }) => (
  <nav className="navbar bg-base-100">
    <div className="flex-1">
      <div className="btn btn-ghost normal-case text-xl">
        <Link href="/">OpenMeetUp</Link>
      </div>
    </div>
    <div className="flex-none gap-2">
      <div className="form-control">
        <input type="text" placeholder="Search" className="input input-bordered" />
      </div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full relative">
            {session.user?.image && <Image src={session.user.image} layout='fill' />}
          </div>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link href="/me">Profile Settings</Link></li>
          <li><Link href="/make-group">Make Group</Link></li>
          <li><Link href="/groups">Groups</Link></li>
          <li><Link href="/make-event">Make Event</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/chat">Conversations</Link></li>
          <li><Link href="/api/auth/signout">Sign Out</Link></li>
        </ul>
      </div>
    </div>
  </nav>
)

export default NavBar
