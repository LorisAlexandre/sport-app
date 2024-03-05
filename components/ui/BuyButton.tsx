"use client";

import { useRouter } from "next/navigation";
import { Button } from ".";
import { stripe } from "@/lib/stripe";

export const BuyButton = () => {
  const router = useRouter();

  const handleCheckoutSession = async () => {
    const res = await fetch("/api/user/getByAuth");
    const { result, user } = await res.json();

    if (!result || !user) {
      return;
    }

    const customerId = user?.stripeCustomerId;

    if (!customerId) {
      throw new Error("No customer Id");
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: "https://sport-app-zeta.vercel.app/success",
      cancel_url: "https://sport-app-zeta.vercel.app/",
      line_items: [
        {
          price: "price_1Op8kuBvdD53Amib1yD8qXBB",
          quantity: 1,
        },
      ],
      discounts: [
        {
          coupon: "XO6L2Inc",
        },
      ],
    });

    if (!session.url) {
      throw new Error("No session created try later");
    }

    router.push(session.url);
  };

  return <Button onClick={handleCheckoutSession}>Buy</Button>;
};
