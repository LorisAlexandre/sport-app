"use client";

import { UserPlan } from "@prisma/client";
import Image from "next/image";

export const ProfilIcons = ({
  customers,
}: {
  customers: { image: string | null; plan: UserPlan }[];
}) => {
  return (
    <div className="flex -space-x-4">
      {customers
        .filter((_, i) => i < 5)
        .map((u, i) => (
          <Image
            key={i}
            src={u.image ?? ""}
            alt="user icon"
            width={40}
            height={40}
            className="rounded-full p-1 bg-white"
          />
        ))}
    </div>
  );
};
