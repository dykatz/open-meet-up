import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import { trpc } from "../utils/trpc";

const GroupList = () => {
  const groupList = trpc.useQuery(["groups.listGroups"]);

  return (
    <ul>
      {groupList.data?.map(group => (
        <li>
          <Link href={`/g/${group.groupId}`}>{group.group.name}</Link>
        </li>
      ))}
    </ul>
  )
}

const Groups: NextPage = () => {
  const session = useSession({ required: true })

  if (session.status === "loading")
    return <Loading />

  return (
    <main>
      <NavBar session={session.data} />
      <GroupList />
    </main>
  )
}

export default Groups;
