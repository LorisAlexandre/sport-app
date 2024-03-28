import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function WorkoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="flex flex-1 flex-col">
      <Suspense fallback={<p>Chargement des workouts</p>}>{children}</Suspense>
    </main>
  );
}
