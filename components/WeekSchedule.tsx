"use client";

import { Streak } from "@prisma/client";
import { Button } from "./ui";
import { Check, Save } from "lucide-react";
import { useState } from "react";
import { CustomResponse } from "@/lib/types/apiRes";
import { useErrorProvider } from "@/providers/ErrorProvider";
import { useRouter } from "next/navigation";

const WeekSchedule = ({ weekSchema, userId, id: streakId }: Streak) => {
  const router = useRouter();
  const { setMessage, setStatusCode, handleRedirect } = useErrorProvider();
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const [weekSchedule, setWeekSchedule] = useState(weekSchema);

  const handleClickDay = (index: number) => {
    if (weekSchedule.includes(index)) {
      setWeekSchedule(weekSchedule.filter((val) => val !== index));
    } else {
      setWeekSchedule([...weekSchedule, index]);
    }
  };

  const handleSaveWeekSchema = async () => {
    const res = await fetch(`/api/streak/update/${streakId}`, {
      method: "PATCH",
      headers: {
        userId,
      },
      body: JSON.stringify({ weekSchema: weekSchedule }),
    });

    try {
      const { result, data, message, redirectTo } =
        (await res.json()) as CustomResponse<Streak>;

      if (!result || !data) {
        setMessage(message);
        setStatusCode(res.status);
        redirectTo && handleRedirect(redirectTo);
        return;
      }

      setWeekSchedule(data.weekSchema);
      router.refresh();
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status);
    }
  };

  const renderWeek = () => {
    let week: JSX.Element[] = [];

    for (let i = 0; i < days.length; i++) {
      week.push(
        <div key={i} className="flex flex-col items-center">
          <Button
            onClick={() => handleClickDay(i)}
            className={`border p-0 aspect-square w-7 h-7 hover:bg-green-400 ${
              weekSchedule.includes(i) && "bg-green-600"
            }`}
          >
            {weekSchedule.includes(i) && <Check size={20} color="white" />}
          </Button>
          <span>{days[i]}</span>
        </div>
      );
    }

    return week;
  };

  return (
    <div className="flex-1 flex flex-col px-8 py-4 rounded-xl border justify-center">
      <div className="flex justify-between gap-2 items-center mb-4">
        <h2 className="text-lg md:text-2xl uppercase">Mon planning hebdo</h2>
        <Button
          className="flex items-center gap-2 text-sm"
          onClick={handleSaveWeekSchema}
          variant={"default"}
        >
          Sauvegarder
          <Save />
        </Button>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">{renderWeek()}</div>
    </div>
  );
};

export default WeekSchedule;
