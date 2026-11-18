"use client";

import { Stagger, StaggerItem } from "@/components/motion";
import type { SpecRows } from "@/lib/types";

interface SpecsTableProps {
  rows: SpecRows[];
}

export function SpecsTable({ rows }: SpecsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Vehicle specifications</caption>
        <Stagger as="tbody">
          {rows.map((row) => (
            <StaggerItem as="tr" key={row.label} className="border-b border-silver/15">
              <th
                scope="row"
                className="w-[40%] py-4 pr-6 align-top text-sm font-normal text-silver"
              >
                {row.label}
              </th>
              <td className="py-4 font-display text-lg text-mist">{row.value}</td>
            </StaggerItem>
          ))}
        </Stagger>
      </table>
    </div>
  );
}
