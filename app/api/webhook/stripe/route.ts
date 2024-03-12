import { findUserFromCustomer, prisma } from "@/lib/db";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as Stripe.Event;

  switch (body.type) {
    case "checkout.session.completed": {
      const session = body.data.object as Stripe.Checkout.Session;
      const stripeCustomerId = session.customer as string;
      const user = await findUserFromCustomer(stripeCustomerId);

      console.log(session);
      if (!user) {
        break;
      }

      let plan: User["plan"] = "Premium";

      if (session.line_items?.data[0].id === process.env.COACH_STRIPE_ID) {
        plan = "Coach";
      }

      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          plan,
        },
      });

      break;
    }
    // ajouter d'autres events cf https://dashboard.stripe.com/test/webhooks
    default: {
      console.log("Unhandled event type", body.type);
    }
  }

  return NextResponse.json({
    result: true,
  });
};
