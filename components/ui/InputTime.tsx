"use client";

import { Exercise, Serie } from "@/lib/db";
import { formatTime, turnIntoMS } from "@/lib/functions";
import { useRef, useState } from "react";

export const InputTime = ({
  value,
  onChange,
  id,
  prop,
}: {
  value: number;
  onChange: Function;
  id: string;
  prop: "break" | "workoutTime" | "toAchieved";
}) => {
  const minutesRef = useRef<HTMLInputElement | null>(null);
  const secondsRef = useRef<HTMLInputElement | null>(null);

  const [minutesLength, setMinutesLength] = useState(2);
  const [secondsLength, setSecondsLength] = useState(2);

  return (
    <div className="flex gap-2 text-2xl font-bold">
      <input
        className="size-10 px-1 flex items-center justify-center text-center border border-black/80 rounded-md text-lg"
        type="tel"
        value={String(formatTime(value).minutes).padStart(2, "0")}
        ref={minutesRef}
        min={0}
        onFocus={(e) => {
          setMinutesLength(2);
          e.target.select();
        }}
        onKeyDown={(e) => {
          if (e.code === "Backspace") return;
          setMinutesLength(minutesLength - 1);
        }}
        onChange={(e) => {
          if (minutesLength <= 0) {
            secondsRef.current?.focus();
          }
          if (prop === "toAchieved") {
            onChange(id, "exerciseProp", "workoutTime");
          }
          onChange(
            id,
            prop,
            turnIntoMS(0, 0, Number(e.target.value), formatTime(value).seconds)
          );
        }}
      />
      &quot;
      <input
        className="size-10 px-1 flex items-center justify-center text-center border border-black/80 rounded-md text-lg"
        type="tel"
        value={String(formatTime(value).seconds).padStart(2, "0")}
        ref={secondsRef}
        min={0}
        onFocus={(e) => {
          setSecondsLength(2);
          e.target.select();
        }}
        onKeyDown={(e) => {
          if (e.code === "Backspace") return;
          setSecondsLength(secondsLength - 1);
        }}
        onChange={(e) => {
          if (secondsLength <= 0) {
            secondsRef.current?.blur();
          }
          onChange(
            id,
            prop,
            turnIntoMS(0, 0, formatTime(value).minutes, Number(e.target.value))
          );
        }}
      />
      &apos;
    </div>
  );
};
