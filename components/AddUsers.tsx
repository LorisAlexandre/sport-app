"use client";

import Image from "next/image";
import { Button } from "./ui";
import { useState } from "react";
import { useErrorProvider } from "@/providers/ErrorProvider";
import { CustomResponse } from "@/lib/types/apiRes";
import { Workout } from "@/lib/db";
import { XCircle, UserRoundX } from "lucide-react";

const AddUsers = ({
  usersInWorkout,
  usersToAdd,
  workoutId,
  userId,
}: {
  usersInWorkout: any[];
  usersToAdd: { image: string | null; name: string | null; id: string }[];
  workoutId: string;
  userId: string;
}) => {
  const { setMessage, setStatusCode, handleRedirect } = useErrorProvider();

  const [usersIn, setUsersIn] = useState(usersInWorkout);
  const [possibleUsers, setPossibleUsers] = useState(usersToAdd);

  const handleAddUser = (id: string) => {
    const userToAdd = possibleUsers.find((u) => u.id === id);
    const userToAddIndex = possibleUsers.findIndex((u) => u.id === id);
    if (!userToAdd) return;

    const newPossibleUsers = possibleUsers;
    newPossibleUsers.splice(userToAddIndex, 1);

    setPossibleUsers(newPossibleUsers);

    setUsersIn([...usersIn, userToAdd]);
  };
  const handleRemoveUser = (id: string) => {
    const userToRemove = usersIn.find((u) => u.id === id);
    const userToRemoveIndex = usersIn.findIndex((u) => u.id === id);
    if (!userToRemove) return;

    const newUsersIn = usersIn;
    newUsersIn.splice(userToRemoveIndex, 1);

    setPossibleUsers([...possibleUsers, userToRemove]);
  };

  const handleSaveUsers = async () => {
    const res = await fetch(`/api/workouts/updateUsers/${workoutId}`, {
      method: "PATCH",
      headers: {
        userId,
      },
      body: JSON.stringify({
        users: usersIn.map((u) => {
          if (typeof u === "string") {
            return u;
          } else {
            return u.id;
          }
        }),
      }),
    });

    try {
      const { result, data, message, redirectTo } =
        (await res.json()) as CustomResponse<Workout>;
      if (redirectTo) {
        handleRedirect(redirectTo);
      }
      if (!result || !data) {
        setMessage(message);
        setStatusCode(res.status);
        return false;
      }
    } catch (error) {
      setMessage(String(error));
      setStatusCode(res.status);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-2">
      <div>
        <p className="">Ajout utilisateur</p>
        <div className="flex flex-wrap gap-2">
          {!!possibleUsers.length ? (
            possibleUsers.map((u, i) => (
              <Button
                onClick={() => handleAddUser(u.id)}
                className="h-fit flex flex-col justify-center items-center"
                key={i}
              >
                <Image
                  className="rounded-full"
                  alt="user image"
                  src={u.image ?? ""}
                  width={35}
                  height={35}
                />
                <p>
                  {u.name?.split(" ")[0]} {u.name?.split(" ")[1][0]}.
                </p>
              </Button>
            ))
          ) : (
            <UserRoundX />
          )}
        </div>
      </div>
      <div>
        <p className="">Utilisateur ayant accès à la séance</p>
        <div className="flex flex-wrap gap-2">
          {usersIn.length > 1 ? (
            usersIn.map((u, i) => {
              if (typeof u !== "string") {
                return (
                  <Button
                    onClick={() => handleRemoveUser(u.id)}
                    className="relative h-fit flex flex-col justify-center items-center"
                    key={i}
                  >
                    <Image
                      className="rounded-full"
                      alt="user image"
                      src={u.image ?? ""}
                      width={35}
                      height={35}
                    />
                    <p>
                      {u.name?.split(" ")[0]} {u.name?.split(" ")[1][0]}.
                    </p>
                  </Button>
                );
              }
              return;
            })
          ) : (
            <UserRoundX />
          )}
        </div>
      </div>
      <Button className="mt-2" onClick={handleSaveUsers} variant={"default"}>
        Save
      </Button>
    </div>
  );
};

export default AddUsers;
