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

export const WorkoutCard = (props: Workout) => {
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
          <Link
            href={`/workout/modify/${props.id}`}
            className="bg-white hover:bg-slate-100 p-1 rounded-md"
          >
            <PenBox />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="justify-center">
        <div className="flex justify-between items-center">
          <p>Série {props.series[0]?.rank}</p>
          <p>x {props.series[0]?.repetition}</p>
        </div>
        <div>
          <p>{props.series[0]?.exercises[0]?.name ?? "No name"}</p>
          <div className="flex justify-between items-center">
            <p>Répétitions :</p>
            <p>{props.series[0]?.exercises[0]?.repetition ?? 0}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Repos :</p>
            <div className="flex gap-1">
              <p>
                {!!formatTime(props.series[0]?.exercises[0]?.break ?? 0)
                  .minutes && (
                  <>
                    {String(
                      formatTime(props.series[0]?.exercises[0]?.break ?? 0)
                        .minutes
                    ).padStart(2, "0")}{" "}
                    &quot;{" "}
                  </>
                )}
                {String(
                  formatTime(props.series[0]?.exercises[0]?.break ?? 0).seconds
                ).padStart(2, "0")}{" "}
                &apos;
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center font-bold">
        <AddUsersContainer workoutId={props.id} />
      </CardFooter>
    </Card>
  );
};
