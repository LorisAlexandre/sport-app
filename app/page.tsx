import {
  Herobanner,
  Customers,
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
      <nav className="absolute right-5 top-10 z-50">
        <Button>
          <Link
            href={"/auth/login"}
            className="font-oswald font-bold uppercase text-lg"
          >
            Se connecter
          </Link>
        </Button>
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
