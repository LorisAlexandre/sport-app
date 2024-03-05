import AuthCard from "@/components/AuthCard";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function Home() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <div>
      <pre>{JSON.stringify(user)}</pre>
      <AuthCard />
    </div>
  );
}
