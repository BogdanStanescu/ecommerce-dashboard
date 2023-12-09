import prisma from "@/lib/prisma";

interface IGraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string) => {
  const paidOrders = await prisma.order.findMany({
    where: {
      store_id: storeId,
      is_paid: true,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.created_at.getMonth();

    let revenueForOrder = 0;

    for (const item of order.items) {
      revenueForOrder += +item.product.price;
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: IGraphData[] = Array.from({ length: 12 }, (_, i) => ({
    name: new Date(0, i).toLocaleString("en-US", { month: "short" }),
    total: 0,
  }));

  for (const month in monthlyRevenue) {
    graphData[+month].total = monthlyRevenue[+month];
  }

  return graphData;
};
