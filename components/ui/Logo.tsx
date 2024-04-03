"use server";

import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export const Logo = async () => {
  const session = await auth();

  return (
    <Link
      className="font-bold flex items-center gap-1 z-50"
      href={session?.user ? "/account" : "/"}
    >
      <Image src={"/icon.png"} priority alt="logo app" width={36} height={36} />
      <div className="font-oswald uppercase flex flex-col gap-0 text-lg">
        <p className="-my-2">Pro</p>
        <p className="-my-1">pluze</p>
      </div>
    </Link>
  );
};
