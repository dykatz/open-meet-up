import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";

const Events: NextPage = () => {
  const session = useSession({ required: true })

  if (session.status === "loading")
    return <Loading />

  return (
    <NavBar session={session.data} />
  )
}

export default Events;
