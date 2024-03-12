import { findUserFromCustomer, prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * 
 * {
  id: 'cs_test_a1JyJp1w63lbR42vhMddpS1SelzXQXUwHcrjrxfXdFEIb0smgXz1RpjGVu',
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 10000,
  amount_total: 5000,
  automatic_tax: { enabled: false, liability: null, status: null },
  billing_address_collection: null,
  cancel_url: 'https://sport-app-zeta.vercel.app/',
  client_reference_id: null,
  client_secret: null,
  consent: null,
  consent_collection: null,
  created: 1710261219,
  currency: 'eur',
  currency_conversion: null,
  custom_fields: [],
  custom_text: {
    after_submit: null,
    shipping_address: null,
    submit: null,
    terms_of_service_acceptance: null
  },
  customer: 'cus_Pf9ZuI3uw53MeJ',
  payment_intent: 'pi_3OtYH6BvdD53Amib0Irb2bAs',
  payment_link: null,
  payment_method_collection: 'if_required',
  payment_method_configuration_details: null,
  payment_method_options: { card: { request_three_d_secure: 'automatic' } },
  payment_method_types: [ 'card' ],
  payment_status: 'paid',
  phone_number_collection: { enabled: false },
  recovered_from: null,
  setup_intent: null,
  shipping_address_collection: null,
  shipping_cost: null,
  shipping_details: null,
  shipping_options: [],
  status: 'complete',
  submit_type: null,
  subscription: null,
  success_url: 'https://sport-app-zeta.vercel.app/account',
  total_details: { amount_discount: 5000, amount_shipping: 0, amount_tax: 0 },
  ui_mode: 'hosted',
  url: null
}
 * 
 * 
 */

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as Stripe.Event;

  switch (body.type) {
    case "checkout.session.completed": {
      const checkoutSession = body.data.object as Stripe.Checkout.Session;
      const stripeCustomerId = checkoutSession.customer as string;
      const stripeSession = await stripe.checkout.sessions.retrieve(
        checkoutSession.id
      );
      const user = await findUserFromCustomer(stripeCustomerId);

      if (!user) {
        break;
      }

      let plan: User["plan"] = "Premium";

      console.log(stripeSession);

      if (
        stripeSession.line_items?.data[0].id === process.env.COACH_STRIPE_ID
      ) {
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
