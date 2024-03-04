import { auth } from "@/lib/auth";
import Link from "next/link";

export const Logo = async () => {
  const session = await auth();
  return (
    <Link
      className="cursor-pointer text-3xl font-bold"
      href={session?.user ? "/dashboard" : "/"}
    >
      💪 Sport app
    </Link>
  );
};
