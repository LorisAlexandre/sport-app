"use client";

import { AddAffiliateLink, CopyButton } from ".";
import { Session } from "next-auth";

export const AffiliateLink = ({ session }: { session: Session | null }) => {
  const renderLink = () => {
    let link = null;

    switch (session?.user.plan) {
      case "Coach":
        link = (
          <div>
            <h2 className="uppercase text-xl">Mon lien de coach</h2>
            <div className="flex items-center gap-4">
              <p className="flex-1 border border-black py-2 px-4 rounded-lg">
                {session.user.AffiliateLink}
              </p>
              <CopyButton text={session.user.AffiliateLink!} />
            </div>
          </div>
        );
        break;
      case "None":
        link = <AddAffiliateLink userId={session.user.id} />;
        break;
      default:
        break;
    }

    return link;
  };

  if (session?.user.plan === "Premium" || session?.user.plan === "Guest") {
    return;
  }

  return <div>{renderLink()}</div>;
};
