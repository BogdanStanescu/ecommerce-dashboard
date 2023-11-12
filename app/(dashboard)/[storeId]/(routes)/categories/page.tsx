import React from "react";
import prisma from "@/lib/prisma";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";
import CategoryClient from "./components/client";

const Categories = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const categories = await prisma.category.findMany({
    where: {
      store_id: params.storeId,
    },
    include: {
      billboard: {
        select: {
          label: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.created_at, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
