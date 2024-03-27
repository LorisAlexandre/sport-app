"use client";

import { useGoWorkoutContext } from "@/providers/GoWorkoutProvider";
import { Button } from "./ui";
import Link from "next/link";
import { formatDate } from "@/lib/functions";
import { Medal } from "lucide-react";

export const GG = () => {
  const { cleanWorkout, userEmail } = useGoWorkoutContext();
  const date = formatDate(new Date(), "-");

  const renderGoldenMedal = () => {
    let isValid = true;

    cleanWorkout.series.map((s) =>
      s.exercises.map((e) => {
        if (!e.isDone) {
          isValid = false;
        }
      })
    );

    if (!isValid) {
      return;
    }

    return (
      <div className="w-36 h-fit p-1 rounded-3xl  bg-gradient-to-br from-[#F5AF00] via-[#FFC533] to-[#F5AF00]">
        <p className="px-1 w-full text-center font-bold text-[#212121]">
          Parfait
        </p>
        <div className="bg-gradient-to-br from-[#212121] via-[#3D3D3D] to-[#212121] h-14 rounded-3xl flex items-center justify-center gap-1">
          <p className="text-[#F5AF00] font-bold">100%</p>
          <Medal color="#F5AF00" size={32} />
        </div>
      </div>
    );
  };
  const renderPlatinumMedal = () => {
    let isValid = true;

    cleanWorkout.series.map((s) =>
      s.exercises.map((e) => {
        if (e.bonus.exerciseProp !== null) {
          if (!e.isBonusDone) {
            isValid = false;
          }
        }
      })
    );

    if (!isValid) {
      return;
    }

    return (
      <div className="w-36 h-fit p-1 rounded-3xl bg-gradient-to-br from-[#E5E4E2] via-violet-400 to-[#E5E4E2]">
        <p className="px-1 w-full text-center font-bold text-[#212121]">
          Parfait
        </p>
        <div className="bg-gradient-to-br from-[#212121] via-[#3D3D3D] to-[#212121] h-14 rounded-3xl flex items-center justify-center gap-1">
          <p className="text-[#E5E4E2] font-bold">100%</p>
          <Medal color="#E5E4E2" size={32} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full absolute top-0 left-0 z-50 bg-[#212121] flex flex-col items-center justify-end pb-32">
      <>
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#F2ED6F"
          secondaryColor="#F4E04D"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#FFCB47"
          secondaryColor="#F5AF00"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#6C9D7C"
          secondaryColor="#3A5743"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#586474"
          secondaryColor="#8491A3"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#EA6648"
          secondaryColor="#C93818"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#58355E"
          secondaryColor="#E03616"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#5998C5"
          secondaryColor="#3A79A6"
        />
      </>
      <>
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#F2ED6F"
          secondaryColor="#F4E04D"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#FFCB47"
          secondaryColor="#F5AF00"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#6C9D7C"
          secondaryColor="#3A5743"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#586474"
          secondaryColor="#8491A3"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#EA6648"
          secondaryColor="#C93818"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#58355E"
          secondaryColor="#E03616"
        />
        <FireWork
          delay={Math.random() * 5}
          size={32}
          posX={Math.random() * (window.innerWidth - 100)}
          posY={Math.random() * (window.innerHeight / 2)}
          primaryColor="#5998C5"
          secondaryColor="#3A79A6"
        />
      </>
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex justify-center items-center gap-10">
          {renderGoldenMedal()}
          {renderPlatinumMedal()}
        </div>
        <Button className="uppercase bg-[#F5AF00] hover:bg-[#F5AF00]/80 w-fit">
          <Link
            href={`/dashboard/${userEmail}?date=${date}&workoutName=${cleanWorkout.name}`}
          >
            Suivant
          </Link>
        </Button>
      </div>
    </div>
  );
};

export const FireWork = ({
  size,
  primaryColor,
  secondaryColor,
  posX,
  posY,
  delay,
}: {
  size: number;
  primaryColor: string;
  secondaryColor: string;
  posY: number;
  posX: number;
  delay: number;
}) => {
  return (
    <svg
      width={size}
      height={size}
      style={{ top: `${posY}px`, left: `${posX}px` }}
      className="absolute firework"
    >
      {/* <!-- Chemin Nord --> */}
      <path
        style={{ animationDelay: `${delay}s` }}
        className="animate-move rounded-full"
        d={`M${size / 2},2 L${size / 2},${size / 2}`}
        stroke={primaryColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* <!-- Chemin Nord-Est --> */}
      <path
        style={{ animationDelay: `${delay}s` }}
        className="animate-move rounded-full"
        d={`M${size * 0.75},${size * 0.25} L${size / 2},${size / 2}`}
        stroke={secondaryColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* <!-- Chemin Est --> */}
      <path
        style={{ animationDelay: `${delay}s` }}
        className="animate-move rounded-full"
        d={`M${size - 2},${size / 2} L${size / 2},${size / 2}`}
        stroke={primaryColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* <!-- Chemin Sud-Est --> */}
      <path
        style={{ animationDelay: `${delay}s` }}
        className="animate-move rounded-full"
        d={`M${size * 0.75},${size * 0.75} L${size / 2},${size / 2}`}
        stroke={secondaryColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* <!-- Chemin Sud --> */}
      <path
        style={{ animationDelay: `${delay}s` }}
        className="animate-move rounded-full"
        d={`M${size / 2},${size - 2} L${size / 2},${size / 2}`}
        stroke={primaryColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* <!-- Chemin Sud-Ouest --> */}
      <path
        style={{ animationDelay: `${delay}s` }}
        className="animate-move rounded-full"
        d={`M${size * 0.25},${size * 0.75} L${size / 2},${size / 2}`}
        stroke={secondaryColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* <!-- Chemin Ouest --> */}
      <path
        style={{ animationDelay: `${delay}s` }}
        className="animate-move rounded-full"
        d={`M2,${size / 2} L${size / 2},${size / 2}`}
        stroke={primaryColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* <!-- Chemin Nord-Ouest --> */}
      <path
        style={{ animationDelay: `${delay}s` }}
        className="animate-move rounded-full"
        d={`M${size * 0.25},${size * 0.25} L${size / 2},${size / 2}`}
        stroke={secondaryColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
