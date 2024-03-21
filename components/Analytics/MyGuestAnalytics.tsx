"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { UserRoundX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const MyGuestAnalytics = async () => {
  const session = await auth();

  if (session?.user.plan !== "Coach") {
    return;
  }

  const myGuests = await prisma.user.findMany({
    where: {
      AffiliateLink: session.user.AffiliateLink,
    },
    select: {
      name: true,
      image: true,
      email: true,
    },
  });

  return (
    <Accordion type="single" collapsible className="w-full px-4">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-2xl uppercase items-center font-normal [&_svg]:w-8 [&_svg]:h-8">
          Les analises de mes invités
        </AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {myGuests.length > 1 ? (
            myGuests
              // .filter((u) => u.name !== session.user.name)
              .map((u, i) => (
                <Button key={i} className="h-fit border">
                  <Link
                    href={`/dashboard/${u.email}`}
                    className="h-fit flex flex-col justify-center items-center"
                  >
                    <Image
                      className="rounded-full"
                      alt="user image"
                      src={u.image ?? ""}
                      width={35}
                      height={35}
                    />
                    <p>
                      {u.name?.split(" ")[0]} {u.name?.split(" ")[1][0]}.
                    </p>
                  </Link>
                </Button>
              ))
          ) : (
            <UserRoundX />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
