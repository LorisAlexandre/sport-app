"use client";

import { CustomResponse } from "@/lib/types/apiRes";
import { useErrorProvider } from "@/providers/ErrorProvider";
import { Workout } from "@prisma/client";

const ModifWorkout = ({ res }: { res: Response }) => {
  const {} = useErrorProvider();

  return <div>Mon workout</div>;
};

export default ModifWorkout;
