import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Workout } from "@/lib/db";
import { formatTime } from "@/lib/functions";
import AddUsersContainer from "../AddUsersContainer";
import { Play, PenBox } from "lucide-react";
import { Session } from "next-auth";

export const WorkoutCard = (props: Workout & { session: Session | null }) => {
  const renderModifWorkout = () => {
    let modif = null;

    if (
      props.session?.user.plan === "Coach" ||
      props.session?.user.plan === "Premium"
    ) {
      modif = (
        <Link
          href={`/workout/modify/${props.id}`}
          className="bg-white hover:bg-slate-100 p-1 rounded-md"
        >
          <PenBox />
        </Link>
      );
    }

    return modif;
  };
  const renderCardFooter = () => {
    let footer = null;

    if (
      props.session?.user.plan === "Coach" ||
      props.session?.user.plan === "Premium"
    ) {
      footer = (
        <CardFooter className="justify-center font-bold">
          <AddUsersContainer workoutId={props.id} />
        </CardFooter>
      );
    }

    return footer;
  };

  return (
    <Card className="gap-4 border-black border-2">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="uppercase font-bold">{props.name}</CardTitle>
        <div className="flex gap-3">
          <Link
            href={`/workout/${props.id}`}
            className="bg-white hover:bg-slate-100 p-1 rounded-md"
          >
            <Play />
          </Link>
          {renderModifWorkout()}
        </div>
      </CardHeader>
      <CardContent className="justify-center pb-0">
        <div className="flex justify-between items-center font-medium">
          <p>Série {props.series[0]?.rank}</p>
          <p>x {props.series[0]?.repetition}</p>
        </div>
        <div className="px-2">
          <p>{props.series[0]?.exercises[0]?.name ?? "No name"}</p>
          <div className="flex justify-between items-center">
            <p>Répétitions :</p>
            <p>{props.series[0]?.exercises[0]?.repetition ?? 0}</p>
          </div>
          <p>...</p>
        </div>
      </CardContent>
      {renderCardFooter()}
    </Card>
  );
};
