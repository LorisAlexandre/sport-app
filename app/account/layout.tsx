import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return <main>{children}</main>;
}
