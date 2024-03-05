import { Exercise, PrismaClient, Serie, User, Workout } from "@prisma/client";
import { auth } from "../auth";
// import { withAccelerate } from "@prisma/extension-accelerate";

export type { Exercise, Serie, Workout } from "@prisma/client";

export type PrismaModels = "workout" | "serie" | "exercise";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export const verifUserId = async <T extends Exercise | Serie | Workout>(
  userId: string,
  id: string,
  schema: PrismaModels
) => {
  const doc = (await (prisma[schema] as any).findUnique({
    where: {
      id,
    },
  })) as T;

  if (!doc) return { result: false };

  if (doc?.userId !== userId) return { result: false };

  return { result: true, doc };
};

export const isAbleToCUD = async (userId: User["id"]) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user?.plan === "Guest" || user?.plan === "None") {
    return { result: false, user };
  }

  return { result: true, user };
};

export const findUserFromCustomer = async (stripeCustomerId: string) => {
  if (!stripeCustomerId) return null;

  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId,
    },
  });
  return user;
};
