"use client";

import { Stagger, StaggerItem } from "@/components/motion";
import type { SpecRows } from "@/lib/types";

interface SpecsTableProps {
  rows: SpecRows[];
}

export function SpecsTable({ rows }: SpecsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[17rem] border-collapse text-left">
        <caption className="sr-only">Vehicle specifications</caption>
        <Stagger as="tbody">
          {rows.map((row) => (
            <StaggerItem
              as="tr"
              key={row.label}
              className="border-b border-silver/15"
            >
              <th
                scope="row"
                className="py-3.5 pr-4 align-middle text-sm font-normal text-silver sm:py-4 sm:pr-6"
              >
                {row.label}
              </th>
              <td className="py-3.5 text-right font-display text-base text-mist break-words sm:py-4 sm:text-lg">
                {row.value}
              </td>
            </StaggerItem>
          ))}
        </Stagger>
      </table>
    </div>
  );
}
