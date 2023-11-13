import React from "react";
import BillboardClient from "./components/client";
import prisma from "@/lib/prisma";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const Products = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const products = await prisma.product.findMany({
    where: {
      store_id: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.is_featured,
    isArchived: product.is_archived,
    price: formatter.format(product.price),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.created_at, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default Products;
