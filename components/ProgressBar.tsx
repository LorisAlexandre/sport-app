"use client";

import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

export const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((pr) => (pr >= 100 ? 0 : pr + 10));
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return <Progress value={progress} />;
};
