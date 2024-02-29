import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const BuyButton = () => {
  const handleBuy = async () => {
    "use server";

    const session = await auth();
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id ?? "",
      },
      select: {
        stripeCustomerId: true,
      },
    });

    const stripeCustomerId = user?.stripeCustomerId ?? undefined;

    if (!stripeCustomerId) {
      return;
    }

    const stripeSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1Op8kuBvdD53Amib1yD8qXBB",
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    if (!stripeSession.url) throw new Error("Stripe session failed");

    redirect(stripeSession.url);
  };

  return (
    <form>
      <button
        formAction={handleBuy}
        className="rounded px-4 py-2 w-fit bg-green-500 text-white"
      >
        Buy it!
      </button>
    </form>
  );
};
