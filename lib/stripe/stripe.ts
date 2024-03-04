import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51OACi2BvdD53Amib7xWItyelwphGJEGULzOcN7NszVmxclFzKqib5uxaHLiT2sLqDF5wUh11uhs47lZTR1UcdCqV00ZmPmkonh",
  {
    apiVersion: "2023-10-16",
    typescript: true,
  }
);
