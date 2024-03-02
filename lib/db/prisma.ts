import { Exercise, PrismaClient, Serie, Workout } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";

export type { Exercise, Serie, Workout } from "@prisma/client";

export type PrismaModels = "workout" | "serie" | "exercise";

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

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
