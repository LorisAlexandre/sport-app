"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";

type Status = {
  value: string;
  label: string;
};

export function ComboBoxResponsive({
  statuses,
  selectedStatus,
  setSelectedStatus,
  buttonText,
  label = buttonText,
}: {
  statuses: Status[];
  selectedStatus: Status | null;
  setSelectedStatus: React.Dispatch<React.SetStateAction<Status | null>>;
  buttonText: string;
  label?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedStatus ? <>{selectedStatus.label}</> : <>{buttonText}</>}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <StatusList
              statuses={statuses}
              setOpen={setOpen}
              setSelectedStatus={setSelectedStatus}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selectedStatus ? <>{selectedStatus.label}</> : <>{buttonText}</>}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <StatusList
              statuses={statuses}
              setOpen={setOpen}
              setSelectedStatus={setSelectedStatus}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  statuses,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  statuses: Status[];
}) {
  return (
    <Command>
      <CommandInput placeholder="Change le type d'exo..." />
      <CommandList>
        <CommandEmpty>Aucun résultat.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                if (value === "null") {
                  setSelectedStatus(null);
                } else {
                  setSelectedStatus(
                    statuses.find((priority) => priority.value === value) ||
                      null
                  );
                }
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
