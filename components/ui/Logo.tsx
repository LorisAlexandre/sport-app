"use server";

import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export const Logo = async () => {
  const session = await auth();

  return (
    <Link
      className="cursor-pointer text-3xl font-bold"
      href={session?.user ? "/dashboard" : "/"}
    >
      <Image src={"/icon.png"} priority alt="logo app" width={64} height={64} />
    </Link>
  );
};
