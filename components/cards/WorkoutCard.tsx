import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Workout } from "@/lib/db";
import { formatTime } from "@/lib/functions";
import AddUsersContainer from "../AddUsersContainer";
import { Play, PenBox } from "lucide-react";
import { Session } from "next-auth";
import { Button } from "../ui";

export const WorkoutCard = (workout: Workout & { session: Session | null }) => {
  const renderModifWorkout = () => {
    let modif = null;

    if (
      workout.session?.user.plan === "Coach" ||
      workout.session?.user.plan === "Premium"
    ) {
      modif = (
        <Button>
          <Link
            href={`/workout/modify/${workout.id}`}
            className="flex items-center gap-2"
          >
            Modifier
            <PenBox size={20} />
          </Link>
        </Button>
      );
    }

    return modif;
  };
  const renderCardFooter = () => {
    let footer = null;

    if (
      workout.session?.user.plan === "Coach" ||
      workout.session?.user.plan === "Premium"
    ) {
      footer = (
        <CardFooter className="justify-center font-bold">
          <AddUsersContainer workoutId={workout.id} />
        </CardFooter>
      );
    }

    return footer;
  };

  return (
    <Card className="gap-4 border-black border-2">
      <CardHeader className="flex-col items-start justify-between">
        <CardTitle className="uppercase font-bold">{workout.name}</CardTitle>
        <CardDescription className="flex gap-2 text-black/90">
          <Button>
            <Link
              href={`/workout/${workout.id}`}
              className="flex gap-2 items-center"
            >
              Lancer
              <Play size={20} />
            </Link>
          </Button>
          {renderModifWorkout()}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex flex-col gap-2">
        <p className="font-medium">Nombre de série: {workout.series.length}</p>
        <p className="font-medium">
          Nombre d&apos;exercice:{" "}
          {workout.series.reduce((acc, curr) => acc + curr.exercises.length, 0)}
        </p>
      </CardContent>
      {renderCardFooter()}
    </Card>
  );
};
