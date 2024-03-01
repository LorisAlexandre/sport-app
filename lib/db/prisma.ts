import { PrismaClient } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";

export type { Exercise, Serie, Workout } from "@prisma/client";

export type PrismaModels = "workout" | "serie" | "exercise";

export const verifUserId = async (
  userId: string,
  id: string,
  schema: PrismaModels
) => {
  const doc = await (prisma[schema] as any).findUnique({
    where: {
      id,
    },
  });

  if (!doc) return false;

  if (doc?.userId !== userId) return false;

  return true;
};

export const prisma = new PrismaClient();
