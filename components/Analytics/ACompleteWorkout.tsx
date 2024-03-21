"use client";

import { ExerciseAnalytics, WorkoutAnalytic } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/lib/functions";
import { Button } from "../ui";
import { ChevronLeft, SearchX } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { AExerciseResume } from ".";

export const ACompleteWorkout = ({ workout }: { workout: WorkoutAnalytic }) => {
  const router = useRouter();
  const [notes, setNotes] = useState<string>(
    workout.notes ?? "Ajoute des détails sur ta séance"
  );

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

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button onClick={() => router.back()} className="aspect-square p-0">
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
            className="border border-black rounded-md resize-y w-full px-4 py-2"
            cols={30}
            rows={10}
            onChange={handleChangeCommentaire}
            onFocus={(e) => e.target.select()}
            value={notes}
          ></textarea>
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
