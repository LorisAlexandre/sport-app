"use client";

import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const handleClick = async () => {
    const res = await fetch("/api/exercises/update/clt9wu0n1000g14oldfi1o1eu", {
      method: "PATCH",
      body: JSON.stringify({
        name: "big boii",
      }),
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
      {session && <p>{session.user?.email}</p>}
    </div>
  );
}
