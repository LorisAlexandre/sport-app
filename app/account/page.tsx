"use client";

import { Button } from "@/components/ui";
import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <div>
      <Button variant={"default"} onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
