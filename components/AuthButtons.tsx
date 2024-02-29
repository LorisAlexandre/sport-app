"use client";

import { signIn, signOut } from "next-auth/react";

export const Loginbutton = () => {
  return (
    <button className="px-4 py-2 border w-fit" onClick={() => signIn("google")}>
      Login
    </button>
  );
};

export const Logoutbutton = () => {
  return (
    <button className="px-4 py-2 border w-fit" onClick={() => signOut()}>
      Logout
    </button>
  );
};
