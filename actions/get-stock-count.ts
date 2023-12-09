import prisma from "@/lib/prisma";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prisma.product.count({
    where: {
      store_id: storeId,
      is_archived: false,
    },
  });

  return stockCount;
};
