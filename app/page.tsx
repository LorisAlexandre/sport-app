import AuthCard from "@/components/AuthCard";
import Pricing from "@/components/Pricing";
import { Button } from "@/components/ui";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="">
      <Button>
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
    </div>
  );
}
