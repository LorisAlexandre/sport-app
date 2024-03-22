"use client";

import { signOut } from "next-auth/react";
import { Button } from ".";

export const LogoutButton = () => {
  return (
    <Button
      variant={"default"}
      size={"lg"}
      className="uppercase text-2xl w-full"
      onClick={() => signOut()}
    >
      Se déconnecter
    </Button>
  );
};
