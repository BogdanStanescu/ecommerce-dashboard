"use client";

import { ColumnDef } from "@tanstack/react-table";

type Status = "pending" | "processing" | "success" | "failed";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
