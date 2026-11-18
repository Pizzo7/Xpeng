"use client";

import { Stagger, StaggerItem } from "@/components/motion";
import { ShowroomCard } from "@/components/showrooms/ShowroomCard";
import type { Showroom } from "@/lib/types";

interface ShowroomListProps {
  showrooms: Showroom[];
}

/** Staggered showroom cards — keeps the showrooms page as a server component */
export function ShowroomList({ showrooms }: ShowroomListProps) {
  return (
    <Stagger className="grid gap-6 md:grid-cols-2">
      {showrooms.map((showroom, index) => (
        <StaggerItem
          key={showroom.id}
          direction={index % 2 === 0 ? "left" : "right"}
        >
          <ShowroomCard showroom={showroom} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
