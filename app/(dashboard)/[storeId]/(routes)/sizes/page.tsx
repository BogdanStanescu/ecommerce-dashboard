import React from "react";
import prisma from "@/lib/prisma";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";
import SizeClient from "./components/client";

const Sizes = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const sizes = await prisma.size.findMany({
    where: {
      store_id: params.storeId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.created_at, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default Sizes;
