import React from "react";
import prisma from "@/lib/prisma";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns";
import SizeClient from "./components/client";

const Colors = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const colors = await prisma.color.findMany({
    where: {
      store_id: params.storeId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.created_at, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedColors} />
      </div>
    </div>
  );
};

export default Colors;
