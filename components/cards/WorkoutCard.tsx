import Link from "next/link";
import { Button } from "../ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const WorkoutCard = () => {
  return (
    <Card className="gap-4 border-black border-2">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="uppercase font-bold">Séance Jambe</CardTitle>
        <div className="flex gap-3">
          <Link
            href={`/workout/${"id"}`}
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
            href={`/workout/modify/${"id"}`}
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
          <p>Série 1</p>
          <p>x 1</p>
        </div>
        <div>
          <p>Max squat</p>
          <div className="flex justify-between items-center">
            <p>Répétitions :</p>
            <p>5</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Repos :</p>
            <div className="flex gap-1">
              <p>2</p>
              <p>"</p>
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
