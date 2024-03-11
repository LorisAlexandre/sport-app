import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function WorkoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return <main className="flex flex-1 flex-col">{children}</main>;
}
