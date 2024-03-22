import AuthCard from "@/components/AuthCard";
import Pricing from "@/components/Pricing";
import { Button } from "@/components/ui";
import { auth } from "@/lib/auth";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/account");
  }

  return (
    <div className="">
      <Pricing session={session} />
    </div>
  );
}
