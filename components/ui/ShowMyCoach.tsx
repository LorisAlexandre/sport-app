import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const ShowMyCoach = async () => {
  const session = await auth();

  const myCoach = await prisma.user.findFirst({
    where: {
      AffiliateLink: session?.user.AffiliateLink,
      plan: "Coach",
    },
    select: {
      name: true,
    },
  });

  return (
    <div>
      <p>Mon coach est {myCoach?.name}</p>
    </div>
  );
};
