"use client";

import { Analytic, ExerciseAnalytics, WorkoutAnalytic } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/lib/functions";
import { Button } from "../ui";
import { ChevronLeft, Save, SearchX } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { AExerciseResume } from ".";
import { Session } from "next-auth";
import { useErrorProvider } from "@/providers/ErrorProvider";
import { CustomResponse } from "@/lib/types/apiRes";

export const ACompleteWorkout = ({
  workout,
  session,
  analyticId,
}: {
  workout: WorkoutAnalytic;
  session: Session | null;
  analyticId: Analytic["id"];
}) => {
  const router = useRouter();
  const [notes, setNotes] = useState<string>(
    workout.notes ?? "Ajoute des détails sur ta séance"
  );
  const params = useParams();
  const { setMessage, setStatusCode, handleRedirect } = useErrorProvider();

  const exercises: ExerciseAnalytics[] = [];
  workout.series.map((s) =>
    s.exercises.map((e) => {
      e.workoutTime = 90_000;
      e.bonus.exerciseProp = "workoutTime";
      e.bonus.toAchieved = 30_000;
      for (let j = 0; j < s.repetition; j++) {
        exercises.push(e);
      }
    })
  );

  const handleChangeCommentaire = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };
  const handleSaveCommentaire = async () => {
    const res = await fetch(
      `/api/analytic/updateNotes/${analyticId}?date=${formatDate(
        workout.createdAt,
        "-"
      )}&workoutName=${workout.name}`,
      {
        headers: {
          userId: session?.user.id,
        } as RequestInit["headers"],
        method: "PATCH",
        body: JSON.stringify({ notes }),
      }
    );

    try {
      const { result, data, message, redirectTo } =
        (await res.json()) as CustomResponse<any>;

      if (!result || !data) {
        setMessage(message);
        setStatusCode(res.status);
        redirectTo && handleRedirect(redirectTo);
        return;
      }
    } catch (error) {
      setStatusCode(res.status);
      setMessage(String(error));
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => router.push(`/dashboard/${session?.user.email}`)}
          className="aspect-square p-0"
        >
          <ChevronLeft />
        </Button>
        <h2 className="uppercase font-bold text-2xl">
          {formatDate(workout.createdAt)}
        </h2>
      </div>
      <Card className="border-none">
        <CardHeader className="flex-row items-center">
          <CardTitle className="uppercase font-bold">{workout.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <span className="text-2xl font-semibold font-oswald uppercase">
            Commentaire :
          </span>
          <textarea
            disabled={
              (params.email as string).replace("%40", "@") !==
              session?.user.email
            }
            className="border border-black rounded-md resize-y w-full px-4 py-2"
            cols={30}
            rows={10}
            onChange={handleChangeCommentaire}
            onFocus={(e) => e.target.select()}
            value={notes}
          ></textarea>
          <Button
            disabled={
              (params.email as string).replace("%40", "@") !==
              session?.user.email
            }
            onClick={handleSaveCommentaire}
            variant={"default"}
            className="flex items-center gap-2"
          >
            Sauvegarder commentaire <Save size={15} />
          </Button>
        </CardContent>
        <CardContent className="flex flex-col gap-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="uppercase text-2xl [&_svg]:w-8 [&_svg]:h-8">
                Exercises
              </AccordionTrigger>
              <AccordionContent>
                {!!exercises.length ? (
                  exercises.map((e, i) => <AExerciseResume {...e} key={i} />)
                ) : (
                  <span className="flex items-center gap-2 font-medium">
                    <SearchX /> Aucun exercice trouvé
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
