import { AffiliateLink, LogoutButton, ShowMyCoach } from "@/components/ui";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-8 pb-32">
      {session?.user.plan === "Guest" && <ShowMyCoach />}
      <AffiliateLink session={session} />
      {/* <GetTestimonials /> */}
      <LogoutButton />
    </div>
  );
}
