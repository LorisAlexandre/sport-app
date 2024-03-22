"use client";

import { useRouter } from "next/navigation";
import { Button } from ".";
import { stripe } from "@/lib/stripe";
import { Session } from "next-auth";
import { useErrorProvider } from "@/providers/ErrorProvider";

export const BuyButton = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const { setMessage, handleRedirect } = useErrorProvider();

  const handleCheckoutSession = async () => {
    const user = session?.user;

    if (!user) {
      setMessage("Tu n'es pas encore connecté !");
      handleRedirect("/auth/login");
      return;
    }

    const customerId = user?.stripeCustomerId;

    if (!customerId) {
      throw new Error("No customer Id");
    }

    const stripeSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: "https://sport-app-zeta.vercel.app/account",
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

    if (!stripeSession.url) {
      throw new Error("No session created try later");
    }

    router.push(stripeSession.url);
  };

  return (
    <Button variant={"default"} onClick={handleCheckoutSession}>
      Get SPORT-APP
    </Button>
  );
};
