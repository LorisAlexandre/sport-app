import { AffiliateLink, LogoutButton, ShowMyCoach } from "@/components/ui";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-8 mb-28">
      {session?.user.plan === "Guest" && <ShowMyCoach />}
      <AffiliateLink session={session} />
      {/* <GetTestimonials /> */}
      <LogoutButton />
    </div>
  );
}
