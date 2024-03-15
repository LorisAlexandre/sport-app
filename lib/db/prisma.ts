import {
  Exercise as ExerciseFromPrisma,
  PrismaClient,
  Serie as SerieFromPrisma,
  Streak,
  User,
  Workout as WorkoutFromPrisma,
} from "@prisma/client";
import { auth } from "../auth";
// import { withAccelerate } from "@prisma/extension-accelerate";

export type PrismaModels = "workout" | "serie" | "exercise" | "streak";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export type Workout = WorkoutFromPrisma & { series: Serie[] };
export type Serie = SerieFromPrisma & { exercises: Exercise[] };
export type Exercise = ExerciseFromPrisma;

export const verifUserId = async <
  T extends Exercise | Serie | Workout | Streak
>(
  userId: string,
  id: string,
  schema: PrismaModels
) => {
  const doc = (await (prisma[schema] as any).findUnique({
    where: {
      id,
    },
  })) as T;

  if (!doc) return { result: false, doc };

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
