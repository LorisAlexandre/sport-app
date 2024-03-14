"use client";

import Pricing from "@/components/Pricing";
import { Button } from "@/components/ui";
import { auth } from "@/lib/auth";
import { signOut } from "next-auth/react";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      {session?.user.plan === "None" && <Pricing session={session} />}
      <Button variant={"default"} onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
