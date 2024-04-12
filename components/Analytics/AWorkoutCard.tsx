"use client";

import { formatDate } from "@/lib/functions";
import { WorkoutAnalytic } from "@prisma/client";
import { Button } from "../ui";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChevronRight, PenBox } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export const AWorkoutCard = (workout: WorkoutAnalytic) => {
  const params = useParams();

  return (
    <Card className="border-black">
      <CardHeader className="flex-row items-center justify-between pb-4">
        <CardTitle className="uppercase font-bold">
          {workout.name} - {formatDate(workout.createdAt)}
        </CardTitle>
      </CardHeader>
      <CardContent className="justify-center font-medium pb-4 truncate">
        Commentaire: {workout.notes ?? "Aucun commentaire"}
      </CardContent>
      <CardFooter>
        <Button variant={"default"}>
          <Link
            className="flex items-center gap-3"
            href={`/dashboard/${params.email}?date=${formatDate(
              workout.createdAt,
              "-"
            )}&workoutName=${workout.name}`}
          >
            Voir plus <ChevronRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
