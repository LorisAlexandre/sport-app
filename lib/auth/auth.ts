import NextAuth, { Account, Profile, User as UserFromAuth } from "next-auth";

import Google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { stripe } from "../stripe";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  events: {
    async createUser(message) {
      const { id: userId, email, name } = message.user;

      if (!userId || !email) return;

      const stripeCustomer = await stripe.customers.create({
        email,
        name: name ?? undefined,
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          stripeCustomerId: stripeCustomer.id,
        },
      });
      await prisma.streak.create({
        data: {
          userId,
        },
      });
      await prisma.analytic.create({
        data: {
          userId,
        },
      });
    },
    async signIn(session) {
      const currUser = session.user;

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

      if (!user) {
        return;
      }

      session.user = {
        ...currUser,
        ...user,
      };
    },
    async signOut(message: any) {
      const userId = message.session.userId;

      if (!userId) return;

      await prisma.session.deleteMany({
        where: {
          userId,
        },
      });
    },
  },
});

export const middleware = auth((req) => {
  req.auth;
});

export const getUserId = async (): Promise<string | null> => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  if (!session.user.id) {
    return null;
  }

  return session.user.id;
};
