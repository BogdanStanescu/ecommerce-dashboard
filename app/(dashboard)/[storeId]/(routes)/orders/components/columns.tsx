"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrdersColumn = {
  id: string;
  phone: string;
  address: string;
  products: string;
  totalPrice: string;
  createdAt: string;
  isPaid: boolean;
};

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
