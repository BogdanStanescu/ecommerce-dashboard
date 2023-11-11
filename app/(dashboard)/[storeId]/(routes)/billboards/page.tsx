import React from "react";
import BillboardClient from "./components/client";
import prisma from "@/lib/prisma";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

const Billboards = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const billboards = await prisma.billboard.findMany({
    where: {
      store_id: params.storeId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.created_at, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default Billboards;
