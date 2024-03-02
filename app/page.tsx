"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const handleClick = async () => {
    const res = await fetch("/api/exercises/delete/clt9wp16t000a14olhvwqhkj1", {
      method: "DELETE",
      // body: JSON.stringify({}),
    });
    if (!res.ok) {
      console.log(res);

      return;
    }
    const data = await res.json();

    console.log(data);
  };

  return (
    <div className="flex flex-col gap-6 w-fit">
      <p>Welcome to sport App</p>
      <button onClick={handleClick}>Create Workout</button>
      {!session && <button onClick={() => signIn("google")}>Login</button>}
      {session && <button onClick={() => signOut()}>Logout</button>}
      {session && <p>{session.user?.email}</p>}
    </div>
  );
}
