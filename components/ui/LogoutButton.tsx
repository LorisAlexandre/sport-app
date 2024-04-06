"use client";

import { signOut } from "next-auth/react";
import { Button } from ".";

export const LogoutButton = ({ className }: { className?: string }) => {
  return (
    <Button
      variant={"default"}
      size={"lg"}
      className={`${className} uppercase text-2xl w-full max-w-[300px] absolute bottom-28 lg:bottom-24 left-1/2 -translate-x-1/2`}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Se déconnecter
    </Button>
  );
};
