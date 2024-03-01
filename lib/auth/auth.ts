import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
// import Email from "next-auth/providers/nodemailer";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import { stripe } from "../stripe";

const prisma = new PrismaClient();

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    // Email({
    //   server: {
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD,
    //     },
    //   },
    //   from: process.env.SMTP_FROM,
    // }),
  ],
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
    },
  },
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
