"use server";

import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export const Logo = async () => {
  const session = await auth();

  return (
    <Link
      className="font-bold flex items-center gap-1 z-50 w-fit"
      href={session?.user ? "/account" : "/"}
    >
      <Image src={"/icon.png"} priority alt="logo app" width={36} height={36} />
      <p className="font-bold uppercase font-oswald text-xl">Propulze</p>
    </Link>
  );
};
