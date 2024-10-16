"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import AddUsers from "./AddUsers";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./ui/accordion";

const AddUsersContainer = async ({ workoutId }: { workoutId: string }) => {
  const session = await auth();

  if (!session) {
    redirect("/auth/navigation");
  }

  if (session?.user.plan === "Coach") {
    const usersToAdd = await prisma.user.findMany({
      where: {
        AffiliateLink: session?.user.AffiliateLink,
        plan: "Guest",
      },
      select: {
        name: true,
        image: true,
        id: true,
      },
    });
    const workout = await prisma.workout.findUnique({
      where: {
        id: workoutId,
      },
      select: {
        users: true,
      },
    });
    const usersInWorkout = workout?.users as any[];

    usersToAdd.map((u) => {
      if (usersInWorkout?.includes(u.id)) {
        const userIndex = usersInWorkout.findIndex((id) => id === u.id);
        usersInWorkout.splice(userIndex, 1, u);
      }
    });
    usersInWorkout.map((u) => {
      if (typeof u !== "string") {
        const userIndex = usersToAdd.findIndex((id) => id === u.id);
        usersToAdd.splice(userIndex, 1);
      }
    });

    return (
      <div className="flex-1">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-oswald uppercase text-xl [&_svg]:size-8">
              Ajouter des utilisateurs
            </AccordionTrigger>
            <AccordionContent>
              <AddUsers
                userId={session.user.id}
                workoutId={workoutId}
                usersToAdd={usersToAdd}
                usersInWorkout={usersInWorkout}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  } else {
    return null;
  }
};

export default AddUsersContainer;
