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

export const WorkoutCard = (props: Workout) => {
  return (
    <Card className="gap-4 border-black border-2">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="uppercase font-bold">{props.name}</CardTitle>
        <div className="flex gap-3">
          <Link
            href={`/workout/${props.id}`}
            className="aspect-square w-6 bg-white hover:bg-slate-200"
          >
            <svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L15 10.5L1 19.5V1.5Z"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href={`/workout/modify/${props.id}`}
            className="aspect-square w-6 bg-white hover:bg-slate-200"
          >
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 4.5H8M11 14.5H2M11 14.5C11 16.1569 12.3431 17.5 14 17.5C15.6569 17.5 17 16.1569 17 14.5C17 12.8431 15.6569 11.5 14 11.5C12.3431 11.5 11 12.8431 11 14.5ZM7 4.5C7 6.15685 5.65685 7.5 4 7.5C2.34315 7.5 1 6.15685 1 4.5C1 2.84315 2.34315 1.5 4 1.5C5.65685 1.5 7 2.84315 7 4.5Z"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
                {formatTime(props.series[0]?.exercises[0]?.break ?? 0).minutes}{" "}
                min{" "}
                {formatTime(props.series[0]?.exercises[0]?.break ?? 0).minutes}{" "}
                s
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center font-bold">
        Et encore plus ... 💪
      </CardFooter>
    </Card>
  );
};
