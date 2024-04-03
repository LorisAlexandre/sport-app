import {
  Herobanner,
  Customers,
  ProductHunt,
  Reddit,
  Twitter,
  WhyBuy,
  WhoAMI,
  Demo,
  Pricing,
  Testimonials,
  BottomPage,
  Footer,
  FeaturedOn,
  Proof,
} from "@/components/HomePage";
import { Button } from "@/components/ui";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/account");
  }

  return (
    <div className="flex flex-col gap-20">
      <nav className="absolute top-12 right-5">
        <Link
          href={"/auth/login"}
          className="font-oswald font-bold uppercase text-lg"
        >
          Se connecter
        </Link>
      </nav>
      <Herobanner />
      <Customers />
      <Proof />
      <FeaturedOn />
      <WhyBuy />
      <WhoAMI />
      <Demo />
      <Pricing session={session} />
      <Testimonials />
      <BottomPage />
      <Footer />
    </div>
  );
}
