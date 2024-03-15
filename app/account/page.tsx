"use client";

import Pricing from "@/components/Pricing";
import { Button } from "@/components/ui";
import { auth } from "@/lib/auth";
import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <div>
      {/* {session?.user.plan === "None" && <Pricing session={session} />} */}
      <Button variant={"default"} onClick={() => signOut()}>
        Logout
      </Button>
      <span>test</span>
    </div>
  );
}
